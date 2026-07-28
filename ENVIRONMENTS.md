# Environments

This app is built for four environments: **demo**, **development**, **staging**,
and **production**. Only **production** is ever deployed anywhere (Vercel).
The other three are local-only - there is nothing to provision for them
beyond the env files already in this repo.

| Environment | Purpose                                      | Runs via                                       | Data                      | Test-only endpoints |
| ----------- | --------------------------------------------- | ----------------------------------------------- | -------------------------- | -------------------- |
| demo        | Local sales-demo run-through                  | `npm run dev:demo`, or `build:demo` + `start:demo` | Seeded sample data       | Enabled               |
| development | Local development                             | `npm run dev`                                   | Synthetic/dev data          | Enabled               |
| staging     | Local prod-like verification before promoting | `npm run dev:staging`, or `build:staging` + `start:staging` | Anonymized/synthetic data | Disabled  |
| production  | Real users, real data                         | Deployed to Vercel via manual promotion          | Real data                   | Disabled              |

CI (`ci.yml`) builds all four configs on every push, purely as validation
(catching env-specific build breaks early) - it does not deploy any of them.

## Promotion protocol: local verification -> production

There is no hosted staging deployment to check anymore, so verifying a
commit before promoting it is a manual, local step:

1. Check out the commit and run it locally against the staging config
   (`npm run dev:staging`, or `npm run build:staging && npm run start:staging`)
   to verify it looks right.
2. Once satisfied, promote that exact commit to production:

   ```bash
   gh workflow run promote-production.yml -f sha=<verified-commit-sha>
   ```

3. `.github/workflows/promote-production.yml`:
   - **Refuses to run** if that SHA isn't an ancestor of `main` - it will not
     promote a commit that was never merged.
   - Builds that exact commit with production's env config and deploys it
     to the single production Vercel project.
   - On success, pushes an annotated `production/<timestamp>-<sha>` tag, so
     "what's actually running in production" is always answerable from git.
   - **Requires manual approval**: the job runs under the `production`
     GitHub Environment. Once you configure required reviewers for it
     (Settings -> Environments -> production -> Required reviewers - a
     one-time setting this repo's YAML cannot set for you), the job pauses
     until someone approves it. This is the actual "gate" - without this
     one-time setup, anyone who can trigger the workflow can deploy to
     production.

## How an environment is selected

Each environment has:

- A committed, **non-secret** defaults file: `.env.<environment>`
  (`.env.demo`, `.env.development`, `.env.staging`, `.env.production`).
- An optional, **gitignored** local override: `.env.<environment>.local`,
  for secrets (demo/development/staging run entirely off these locally;
  production's real secrets live on the Vercel project instead, see below).

`npm run <script>` picks the environment explicitly (see `package.json`):

```bash
npm run dev              # development, local
npm run dev:demo         # demo, local
npm run dev:staging      # staging, local
npm run build:production # production build (only one Vercel ever runs this)
npm run start:production # production start (local smoke-test before promoting)
```

`src/lib/env.ts` reads `NEXT_PUBLIC_APP_ENV` and throws at startup if it's
missing or not one of the four known values - this is deliberate, so a
misconfigured run fails loudly instead of silently defaulting to production
behavior.

`GET /api/health` reports the active environment - useful for confirming a
local run or the deployed instance picked up the config you expect.

## Hosting: Vercel (production only)

**Chosen** - see `vercel.json` and `.github/workflows/promote-production.yml`.
(This is currently a POC for a fictitious company being shown to clients, so
Vercel's Hobby plan - which prohibits commercial use - is fine here. Revisit
if this ever becomes a real production site for an actual client.) This app
has no image optimization usage, no middleware/proxy, no edge runtime, and no
server actions - just server-rendered pages and two route handlers
(`/api/health`, `/api/inquiries`) backed by HTTP-based clients (Neon's
serverless driver, Resend's API), which is exactly what Vercel's Next.js
support (built by the same team as the framework) handles well.

There is exactly **one** Vercel project (production). `vercel.json`'s
`buildCommand` is hardcoded to `npm run build:production` since that's the
only config Vercel ever builds.

**One-time setup:**

1. Create a Vercel project for production. **Do not link it to this git
   repo** - `promote-production.yml` already owns the deploy path, and a
   linked repo would trigger Vercel's own competing auto-deploys on push.
   (`vercel project add` or the dashboard's "Deploy without Git" flow both
   work - you can still push a placeholder build once via `vercel deploy` to
   initialize it.)
2. On that project, set `DATABASE_URL`, `RESEND_API_KEY`,
   `INQUIRY_FROM_EMAIL`, `AUTH_SECRET`, and `APP_ENV=production`. These are
   **Vercel project env vars, not GitHub secrets** - they're read at runtime
   by Vercel Functions (or, for `APP_ENV`, used by `vercel.json`'s
   buildCommand indirectly via the pulled project settings), not at
   GitHub Actions build time.
3. In this repo's `production` GitHub Environment (Settings → Environments →
   production), add three secrets: `VERCEL_TOKEN` (a Vercel personal/team
   access token), `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` (from Project
   Settings → General, or `.vercel/project.json` after running `vercel link`
   locally once against the production project). These are what
   `promote-production.yml` uses to deploy.
4. Add required reviewers to the `production` GitHub Environment (Settings →
   Environments → production → Required reviewers) - without this, the
   promotion gate described above is not actually enforced.

## What still needs a real decision

This scaffolding does not provision any infrastructure. Before production is
real, you still need to:

1. ~~Pick a hosting provider~~ - Vercel, see above. Still need to actually
   create the production project and its secrets per the steps above.
2. Database: **Neon** (chosen - see `src/lib/db/`). Create a Neon project/
   branch for production and put its connection string on the production
   Vercel project as `DATABASE_URL` (not a GitHub secret - see step 2 under
   "Hosting: Vercel" above). Local environments (demo/development/staging)
   can point at their own Neon branches, or a shared local one, via their
   `.env.<environment>.local` files. Run `npm run db:push` (or
   `db:push:<environment>`) once against each to create the `inquiries`
   table.
3. Email: **Resend** (chosen - see `src/lib/email.ts`). Verify a sending
   domain in Resend, then set `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` on
   the production Vercel project (and in local `.env.production.local` /
   `.env.staging.local` / etc. if you want local runs to send real email).
   Without these, `/api/inquiries` still saves to the database but won't
   send the notification email to info@insureph.org.
4. Fill in a real `AUTH_SECRET` (`openssl rand -base64 32`) on the
   production Vercel project.
5. Replace the placeholder URL in `.env.production` with the real domain
   once it exists (a custom domain attached to the production Vercel
   project, or its `*.vercel.app` default).
6. Create the production Vercel project and its `VERCEL_TOKEN` /
   `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` GitHub Environment secrets - see
   "Hosting: Vercel" above. `promote-production.yml` is already wired to
   Vercel; this is the only remaining piece.
7. Add required reviewers to the `production` GitHub Environment (Settings →
   Environments → production → Required reviewers) - without this, the
   promotion gate described above is not actually enforced.
