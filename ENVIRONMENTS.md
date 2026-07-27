# Environments

This app is built for four environments: **demo**, **development**, **staging**,
and **production**. Nothing is provisioned on any cloud provider yet — this
document, the env files, and the CI/CD workflows are the scaffolding to plug a
provider into later.

| Environment | Purpose                                             | Branch      | Data                       | Test-only endpoints |
| ----------- | ---------------------------------------------------- | ----------- | -------------------------- | -------------------- |
| demo        | Public/sales demo, always resettable                 | `demo`      | Seeded sample data          | Enabled               |
| development | Shared dev integration target (not a laptop)         | `develop`   | Synthetic/dev data          | Enabled               |
| staging     | Prod-like pre-release verification                   | `main`      | Anonymized/synthetic data   | Disabled              |
| production  | Real users, real data                                | `release/*` tag or `main` promotion | Real data | Disabled              |

Adjust the branch mapping once the team's actual git workflow is settled —
what matters right now is that each environment has its own config, its own
secrets, and its own deploy path, and that promotion between them is a
deliberate action, not an accident of merging to the wrong branch.

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

## What still needs a real decision

This scaffolding does not provision any infrastructure. Before demo/staging/
production are real, you still need to:

1. Pick a hosting provider (e.g. Vercel, AWS, Railway, Fly.io) and create one
   project/app per environment (or one project with per-environment env
   scoping, depending on the provider).
2. Pick a database per environment and put its connection string only in
   that environment's secret store.
3. Fill in the real `AUTH_SECRET` per environment (`openssl rand -base64 32`
   — a different value per environment, never reused).
4. Replace the placeholder URLs in `.env.demo` / `.env.staging` /
   `.env.production` with real domains once they exist.
5. Wire the `deploy` steps in `.github/workflows/cd.yml` to that provider's
   CLI/action, and add the required secrets in GitHub's per-environment
   "Environments" settings (Settings → Environments → demo/development/
   staging/production).
