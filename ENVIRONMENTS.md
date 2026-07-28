# Environments

This app is built for four environments: **demo**, **development**, **staging**,
and **production**. Nothing is provisioned on any cloud provider yet — this
document, the env files, and the CI/CD workflows are the scaffolding to plug a
provider into later.

| Environment | Purpose                                      | Deploys on                                    | Data                      | Test-only endpoints |
| ----------- | --------------------------------------------- | ---------------------------------------------- | -------------------------- | -------------------- |
| demo        | Public/sales demo, always resettable          | push to `demo`, or manual re-run                | Seeded sample data          | Enabled               |
| development | Shared dev integration target (not a laptop)  | push to `develop`, or manual re-run             | Synthetic/dev data          | Enabled               |
| staging     | Prod-like pre-release verification            | push to `main`, or manual re-run                | Anonymized/synthetic data   | Disabled              |
| production  | Real users, real data                         | explicit promotion of a staging-verified commit | Real data                   | Disabled              |

Adjust the branch mapping once the team's actual git workflow is settled —
what matters right now is that each environment has its own config, its own
secrets, and its own deploy path, and that promotion to production is a
deliberate action, never an accident of merging to `main`.

## Promotion protocol: development -> staging -> production

**development -> staging** is implicit: once code lands on `main` (via a
reviewed PR from `develop` or a feature branch), `.github/workflows/cd.yml`
builds and deploys it to staging automatically. CI (`ci.yml`) has already
linted and built it on every push, so by the time it reaches `main` it's
already been validated once.

**staging -> production** is explicit and gated, via
`.github/workflows/promote-production.yml`:

```bash
gh workflow run promote-production.yml -f sha=<commit-sha-verified-in-staging>
```

1. You give it the exact commit SHA that is currently deployed and verified
   in staging (shown in the staging deploy's Actions run, or `git log main`).
2. The job **refuses to run** if that SHA isn't an ancestor of `main` — it
   will not promote a commit staging never actually ran.
3. It re-builds that exact commit with production's env config (see "Why
   rebuild instead of reusing the staging build" below) and deploys it.
4. On success it pushes an annotated `production/<timestamp>-<sha>` tag, so
   "what's actually running in production" is always answerable from git.
5. **Requires manual approval**: the job runs under the `production` GitHub
   Environment. Once you configure required reviewers for it (Settings ->
   Environments -> production -> Required reviewers — a one-time setting
   this repo's YAML cannot set for you), the job pauses until someone
   approves it. This is the actual "gate" — without this one-time setup,
   anyone who can trigger the workflow can deploy to production.

### Why rebuild instead of reusing the staging build byte-for-byte

The stricter version of this protocol builds once and promotes the identical
compiled artifact to every environment, so what was tested in staging is
bit-for-bit what runs in production. That doesn't fully apply here: this app
uses `NEXT_PUBLIC_*` env vars (`NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_APP_URL`,
`NEXT_PUBLIC_API_URL`) that Next.js inlines into the client bundle **at
build time**, and those values are intentionally different per environment
(see `src/lib/env.ts`, the `EnvBadge`, `/api/health`). A single build can't
carry two different inlined URLs/labels.

What's actually promoted is the **git commit** — the same source, re-built
with production's env file — not the literal binary. This is the same
approach Vercel/Netlify use under the hood. If you later want true
byte-identical promotion, the `NEXT_PUBLIC_*` values would need to move from
build-time inlining to a runtime source (e.g. a server-rendered value or an
API the client calls), which is a real refactor, not a config change —
revisit only if a concrete incident (e.g. staging/production drift) justifies it.

## How an environment is selected

Each environment has:

- A committed, **non-secret** defaults file: `.env.<environment>`
  (`.env.demo`, `.env.development`, `.env.staging`, `.env.production`).
- An optional, **gitignored** local override: `.env.<environment>.local`,
  for secrets during local development only.
- In CI/CD, real secrets come from the hosting provider's/CI's secret store,
  scoped per environment — never from a file in the repo.

`npm run <script>` picks the environment explicitly (see `package.json`):

```bash
npm run dev              # development, local
npm run dev:demo         # demo, local
npm run dev:staging      # staging, local
npm run build:production # production build
npm run start:production # production start
```

`src/lib/env.ts` reads `NEXT_PUBLIC_APP_ENV` and throws at startup if it's
missing or not one of the four known values — this is deliberate, so a
misconfigured deploy fails loudly instead of silently defaulting to
production behavior.

`GET /api/health` reports the active environment — useful for confirming a
deployment actually picked up the config you expect.

## Hosting: Netlify

**Chosen** — see `netlify.toml` and `.github/workflows/cd.yml` /
`promote-production.yml`. This app has no image optimization usage, no
middleware/proxy, no edge runtime, and no server actions — just server-
rendered pages and two route handlers (`/api/health`, `/api/inquiries`)
backed by HTTP-based clients (Neon's serverless driver, Resend's API), which
is exactly what Netlify's Next.js Runtime (`@netlify/plugin-nextjs`) and its
Functions model support well.

Deploys are driven by GitHub Actions, not Netlify's own git integration:
`netlify deploy --build --prod` runs `netlify.toml`'s build command
(`npm run build:$APP_ENV`) plus the Next.js plugin transform, then deploys
the result as that site's live deploy.

**One-time setup, per environment (demo/development/staging/production):**

1. Create a Netlify site for that environment. **Do not link it to this git
   repo** — GH Actions already owns branch → environment → deploy, and a
   linked repo would trigger Netlify's own competing auto-deploys on push.
   (`netlify sites:create` or the dashboard's "Deploy manually" / API-only
   flow both work.)
2. On that site, set the environment variable `APP_ENV` to the environment
   name (`demo` / `development` / `staging` / `production`) — this selects
   the right `npm run build:<environment>` script in `netlify.toml`.
3. On that site, also set `DATABASE_URL`, `RESEND_API_KEY`,
   `INQUIRY_FROM_EMAIL`, and `AUTH_SECRET`. These are **Netlify site env
   vars, not GitHub secrets** — they're read at runtime by Netlify Functions,
   not at build time, so they belong where the function actually runs. (This
   mirrors how `NEXT_PUBLIC_*` vars are build-time and come from the
   committed `.env.<environment>` file, while these are runtime and
   per-site.)
4. In this repo's GitHub Environment for that environment (Settings →
   Environments → demo/development/staging/production), add two secrets:
   `NETLIFY_AUTH_TOKEN` (a Netlify personal/team access token — can be
   shared across environments) and `NETLIFY_SITE_ID` (that specific site's
   ID, from Site configuration → General → Site details). These are what
   `cd.yml` / `promote-production.yml` use to deploy to the right site.

## What still needs a real decision

This scaffolding does not provision any infrastructure. Before demo/staging/
production are real, you still need to:

1. ~~Pick a hosting provider~~ — Netlify, see above. Still need to actually
   create the 4 sites and their secrets per the steps above.
2. Database: **Neon** (chosen — see `src/lib/db/`). Create one Neon project
   with a branch per environment (demo/development/staging/production),
   mirroring the git branches, and put each branch's connection string in
   that environment's Netlify site as `DATABASE_URL` (see step 3 under
   "Hosting: Netlify" above — not a GitHub secret). Run `npm run db:push`
   once against each to create the `inquiries` table.
3. Email: **Resend** (chosen — see `src/lib/email.ts`). Verify a sending
   domain in Resend, then set `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` on
   each Netlify site. Without these, `/api/inquiries` still saves to the
   database but won't send the notification email to info@insureph.org.
4. Fill in the real `AUTH_SECRET` per environment (`openssl rand -base64 32`
   — a different value per environment, never reused) on each Netlify site.
5. Replace the placeholder URLs in `.env.demo` / `.env.staging` /
   `.env.production` with real domains once they exist (a custom domain
   attached to that environment's Netlify site, or its `*.netlify.app`
   default).
6. Create the 4 Netlify sites and their `NETLIFY_AUTH_TOKEN` /
   `NETLIFY_SITE_ID` GitHub Environment secrets — see "Hosting: Netlify"
   above. The `deploy` steps in `.github/workflows/cd.yml` and
   `promote-production.yml` are already wired to Netlify; this is the only
   remaining piece.
7. Add required reviewers to the `production` GitHub Environment (Settings →
   Environments → production → Required reviewers) — without this, the
   promotion gate described above is not actually enforced.
