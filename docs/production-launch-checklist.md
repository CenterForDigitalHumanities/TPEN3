# TPEN Production Launch — Cross‑Repo Checklist

This checklist coordinates the move from dev to production environments across repos. It encodes the rules you stated so deployments to `main` use production targets while development builds keep using dev targets.

## Environment matrix

- Interfaces (frontend)
  - Dev: `https://dev.app.t-pen.org` (to be provisioned)
  - Prod: `https://app.t-pen.org`
- Services (API)
  - Dev: `https://dev.api.t-pen.org`
  - Prod: `https://api.t-pen.org`
- Static storage
  - Dev: TPEN-Static-Dev repo
  - Prod: TPEN-static repo
- MongoDB database name
  - Dev: `testTpen`
  - Prod: `tpen`
- RERUM store
  - Dev: `https://devstore.rerum.io`
  - Prod: `https://store.rerum.io`

Define these strictly via environment variables and CI environments; avoid hardcoding.

## Global rollout prerequisites

- [ ] DNS/SSL
  - [ ] Create/verify DNS for `api.t-pen.org`, `dev.api.t-pen.org`, `app.t-pen.org`, `dev.app.t-pen.org`
  - [ ] Issue/verify TLS certs (wildcard or per-host); ensure auto-renewal
- [ ] GitHub Environments & Secrets
  - [ ] Create `development` and `production` environments for each repo
  - [ ] Store separate secrets for dev/prod: API base URLs, RERUM URL, Mongo connection strings, DB names, Auth0 Domain/Audience, CORS lists
- [ ] Observability
  - [ ] Centralized log capture for API (prod/dev) with retention
  - [ ] Basic alerts on 5xx error rate, response time, and deploy failures
- [ ] Data readiness
  - [ ] Back up dev `testTpen` and prod `tpen` (if prod pre-populated)
  - [ ] Migration/load plan for `tpen` if seeding initial content
- [ ] Rollback plan
  - [ ] One-click rollback in deploy pipeline or previous release artifacts retained
  - [ ] Document how to point DNS back or redeploy last known good

---

## TPEN-interfaces

Scope: Frontend app currently deploying to `app.t-pen.org` and calling services at `dev.api.t-pen.org`. For production, `main` must target `api.t-pen.org`. Dev deployments go to `dev.app.t-pen.org`.

Config and code
- [ ] Parameterize all network targets via env (or build-time config):
  - [ ] `API_BASE_URL` → dev: `https://dev.api.t-pen.org`, prod: `https://api.t-pen.org`
  - [ ] `RERUM_STORE_URL` → dev: `https://devstore.rerum.io`, prod: `https://store.rerum.io`
  - [ ] `STATIC_REPO_TARGET` (if needed by client) → dev: `TPEN-Static-Dev`, prod: `TPEN-static`
  - [ ] `AUTH0_DOMAIN`, `AUTH0_AUDIENCE` → dev vs prod tenants/settings as applicable
- [ ] Search & replace to remove any hardcoded: `dev.api.t-pen.org`, `TPEN-Static-Dev`, `devstore.rerum.io`
- [ ] Ensure CORS expectations align with API (see TPEN-services section)

CI/CD
- [ ] On `development` branch (or PRs), build with dev env and deploy to `https://dev.app.t-pen.org`
- [ ] On `main`, build with prod env and deploy to `https://app.t-pen.org`
- [ ] Use GitHub Environments `development`/`production` with scoped secrets
- [ ] Add smoke after deploy: load `/` and key routes (non-auth and auth-gated flows)

Validation
- [ ] Confirm app calls the correct API base per environment
- [ ] Confirm RERUM calls use proper domain per environment
- [ ] Confirm any links to static manifests point to the right static repo content

---

## TPEN-services

Scope: Node.js Express API. Dev uses `testTpen` DB, prod uses `tpen`. Dev API host is `dev.api.t-pen.org`; prod is `api.t-pen.org`. Production deployments must replace any dev references and ensure `store.rerum.io` is used.

Environment (.env)
- [ ] `SERVERURL` → dev: `https://dev.api.t-pen.org`, prod: `https://api.t-pen.org`
- [ ] `PORT` (default 3001)
- [ ] Mongo:
  - [ ] `MONGODB` (connection string)
  - [ ] `MONGODBNAME` → dev: `testTpen`, prod: `tpen`
- [ ] Maria (if in use): `MARIADB`, `MARIADBNAME`, `MARIADBUSER`, `MARIADBPASSWORD`
- [ ] Auth0: `AUDIENCE`, `DOMAIN` (dev vs prod values)
- [ ] External services:
  - [ ] `RERUMURL` → dev: `https://devstore.rerum.io`, prod: `https://store.rerum.io`
  - [ ] `TINYPEN` (if used)
- [ ] Static writing target:
  - [ ] If the API writes manifests/files to a repo or path, surface as env: `STATIC_REPO_NAME` (dev: `TPEN-Static-Dev`, prod: `TPEN-static`) and any required tokens
- [ ] CORS allowlist:
  - [ ] Include `https://app.t-pen.org` and `https://dev.app.t-pen.org`

Code and configuration
- [ ] Replace any hardcoded references to `dev.api.t-pen.org`, `devstore.rerum.io`, or `TPEN-Static-Dev` with env-driven config
- [ ] Ensure errors/logging are production-safe (no stack traces to clients)
- [ ] Rate limiting and security headers enabled for prod

CI/CD
- [ ] On `development`, deploy with dev env secrets to `https://dev.api.t-pen.org`
- [ ] On `main`, deploy with prod env secrets to `https://api.t-pen.org`
- [ ] Post-deploy smoke:
  - [ ] GET `/` returns HTML containing “TPEN3 SERVICES BABY!!!”
  - [ ] Protected route returns 401 without token

Quick local validation (from repo docs)
- [ ] `cp sample.env .env` then set env overrides appropriately
- [ ] `npm install`
- [ ] `npm run existsTests` (should pass completely)
- [ ] `npm run unitTests` (DB-required tests may timeout without DBs)
- [ ] Optional: `npm start` and `curl http://localhost:3001/`

---

## TPEN-static and TPEN-Static-Dev

Scope: Stores manifests and related static artifacts.

- [ ] Confirm repo mapping:
  - [ ] Dev writes to TPEN-Static-Dev
  - [ ] Prod writes to TPEN-static
- [ ] CNAMEs present and correct in both repos; verify hosting/CDN rules
- [ ] Automation
  - [ ] If TPEN-services pushes artifacts, grant a token/permission scoped to each repo
  - [ ] Optional: GitHub Action in TPEN-services to commit manifests to the right repo based on environment
- [ ] Cache/headers: ensure appropriate cache-control for manifests (e.g., immutable with versioned paths or short TTLs if overwriting)

Validation
- [ ] Confirm that a manifest written in dev appears in TPEN-Static-Dev and is reachable by URL referenced by dev interfaces
- [ ] Confirm that a manifest written in prod appears in TPEN-static and is reachable by production interfaces

---

## TPEN-Users

Scope: User-facing app that may speak to TPEN-services and Auth0.

Config and code
- [ ] Parameterize network targets:
  - [ ] `API_BASE_URL` → dev: `https://dev.api.t-pen.org`, prod: `https://api.t-pen.org`
  - [ ] `AUTH0_DOMAIN`, `AUTH0_AUDIENCE` → dev vs prod
  - [ ] `RERUM_STORE_URL` if referenced → dev/prod domains
- [ ] Remove any hardcoded dev endpoints

CI/CD
- [ ] On `development`, deploy to dev host (if applicable) with dev env
- [ ] On `main`, deploy to production host with prod env

Validation
- [ ] Confirm login/logout/profile/e2e flows work against the correct API/auth per environment

---

## TPEN3 (site)

- [ ] Update any links that should point to production hosts (`app.t-pen.org`, `api.t-pen.org`)
- [ ] If the site surfaces environment-specific content, ensure build-time configuration matches branch (dev vs prod)

---

## CI/CD rules (common pattern for all repos)

- [ ] Branch to environment mapping
  - [ ] `development` → GitHub Environment: `development` → Dev hosts and secrets
  - [ ] `main` → GitHub Environment: `production` → Prod hosts and secrets
- [ ] Environment variables per environment
  - [ ] Interfaces/Users: `API_BASE_URL`, `RERUM_STORE_URL`, Auth0 values
  - [ ] Services: `SERVERURL`, DB strings and names (`MONGODBNAME`), `RERUMURL`, `CORS_ORIGINS`
  - [ ] Static write targets: repo tokens and repo names
- [ ] Gates and safety
  - [ ] Require approvals for production deploys
  - [ ] Auto-smoke tests post-deploy
  - [ ] Rollback job available

---

## CORS and security

- [ ] API CORS origins include:
  - [ ] `https://app.t-pen.org`
  - [ ] `https://dev.app.t-pen.org`
- [ ] Ensure HTTP security headers (HSTS, no sniff, frameguard, xss protect where applicable)
- [ ] Auth scopes/permissions validated per environment

---

## Final production cutover steps

- [ ] Provision `dev.app.t-pen.org` (not yet implemented) and point dev interfaces there
- [ ] Verify dev flows end-to-end: dev app → dev API → TPEN-Static-Dev → dev RERUM
- [ ] Verify prod flows end-to-end: app → api → TPEN-static → prod RERUM
- [ ] Freeze dev changes or schedule maintenance window for cutover
- [ ] Deploy `main` to production targets
- [ ] Monitor for 30–60 minutes; be ready to roll back if error budgets exceed thresholds

---

## Quick verification snippets

TPEN-services (local, optional)
- `cp sample.env .env`, then set `MONGODBNAME=tpen` to mimic prod locally (or `testTpen` for dev)
- `npm install`
- `npm run existsTests`
- `npm run unitTests`
- Run: `npm start`
- Check: `curl http://localhost:3001/` returns HTML with “TPEN3 SERVICES BABY!!!”

Interfaces/Users (runtime checks)
- Dev: confirm network calls go to `dev.api.t-pen.org` and RERUM `devstore.rerum.io`
- Prod: confirm network calls go to `api.t-pen.org` and RERUM `store.rerum.io`

---

## Notes

- Keep all environment switching centralized in env variables and CI environment configuration.
- Never hardcode `dev.api.t-pen.org`, `TPEN-Static-Dev`, or `devstore.rerum.io` in code paths; gate them behind env.
- Dev MongoDB remains `testTpen`; production MongoDB is `tpen`.
