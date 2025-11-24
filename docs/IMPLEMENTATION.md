# Production Launch Implementation Summary

This document summarizes the code changes made to support environment-based configuration across TPEN repositories for production launch.

## Overview

All repositories now support distinct development and production configurations through environment variables and CI/CD workflows. Hardcoded references to dev/prod URLs have been replaced with configurable values.

---

## TPEN-interfaces Changes

### Files Created

1. **`js/config.js`** - Central configuration module
   - Reads from `window.TPEN_CONFIG` (runtime injection)
   - Provides sensible defaults for development
   - Exports: `servicesURL`, `rerumURL`, `tinyThingsURL`, `baseURL`

2. **`.env.development`** - Development environment template
   - Services: `https://dev.api.t-pen.org`
   - RERUM: `https://devstore.rerum.io/v1`
   - Base: `https://dev.app.t-pen.org`

3. **`.env.production`** - Production environment template
   - Services: `https://api.t-pen.org`
   - RERUM: `https://store.rerum.io/v1`
   - Base: `https://app.t-pen.org`

4. **`CONFIG.md`** - Configuration documentation
   - Explains environment variable priority
   - Documents all available variables
   - Provides deployment instructions
   - Shows runtime injection pattern

### Next Steps for TPEN-interfaces

1. Create GitHub Environments in repository settings:
   - `development` environment
   - `production` environment

2. Set environment secrets for each:
   - All `VITE_*` variables from the respective `.env` files
   - Separate Auth0 credentials for dev/prod

3. Update build/deploy process:
   - Development branch → build with `.env.development` → deploy to dev.app.t-pen.org
   - Main branch → build with `.env.production` → deploy to app.t-pen.org

4. Optional: Add smoke tests in CI to verify deployed interface can reach the API

---

## TPEN-services Changes

### Files Created

1. **`.env.development`** - Development environment template
   - MongoDB: `testTpen` database
   - RERUM: `https://devstore.rerum.io/v1`
   - Static repo: `TPEN-Static-Dev`
   - CORS: Includes localhost and both app domains

2. **`.env.production`** - Production environment template
   - MongoDB: `tpen` database
   - RERUM: `https://store.rerum.io/v1`
   - Static repo: `TPEN-static`
   - CORS: Only production/dev app domains

3. **`CONFIG.md`** - Configuration documentation
   - Complete variable reference
   - Dev vs prod comparison table
   - GitHub secrets setup instructions
   - Troubleshooting guide
   - Validation commands

4. **`__tests__/smoke.test.mjs`** - Post-deployment smoke tests
   - Tests root endpoint for service identifier
   - Validates auth requirement on protected routes
   - Checks CORS headers
   - Verifies 404 handling
   - Measures response time

### Files Modified

1. **`sample.env`**
   - Updated `MONGODBNAME` default: ~~`tpen3`~~ → `testTpen`
   - Fixed RERUM URL typo: ~~`https:/dev/store.rerum.io`~~ → `https://devstore.rerum.io/v1`
   - Updated GitHub integration comments for clarity
   - Added proper default values for `REPO_NAME` (TPEN-Static-Dev)

2. **`app.js`**
   - Added `cors` import
   - Added CORS middleware with configurable origins
   - Reads `CORS_ORIGINS` env variable (comma-separated list)
   - Default CORS allows: `app.t-pen.org`, `dev.app.t-pen.org`, `localhost:8080`
   - Credentials support enabled

3. **`.github/workflows/cd_dev.yaml`**
   - Added `environment: development` to jobs
   - Added new env variables: `CORS_ORIGINS`, `REPO_OWNER`, `REPO_NAME`, `GITHUB_TOKEN`, `BRANCH`, `TPENSTATIC`
   - Added post-deploy smoke test step
   - Waits 5 seconds for service startup
   - Runs smoke tests against `https://dev.api.t-pen.org`

4. **`.github/workflows/cd_prod.yaml`**
   - Added `environment: production` to jobs
   - Added same new env variables as dev workflow
   - Added post-deploy smoke test step
   - Runs smoke tests against `https://api.t-pen.org`

### Environment Variables Added

Server and external services:
- `CORS_ORIGINS` - Comma-separated allowed origins
- `REPO_OWNER` - GitHub organization for static storage
- `REPO_NAME` - Repository name (TPEN-Static-Dev or TPEN-static)
- `GITHUB_TOKEN` - Token for pushing to static repo
- `BRANCH` - Branch name for static commits
- `TPENSTATIC` - Public URL for static files

Existing variables clarified:
- `MONGODBNAME` - Now explicitly `testTpen` (dev) or `tpen` (prod)
- `RERUMURL` - Now explicitly `devstore` (dev) or `store` (prod)

### Next Steps for TPEN-services

1. **Install CORS package:**
   ```bash
   npm install cors
   ```

2. **Create GitHub Environments in repository settings:**
   - `development` environment with dev secrets
   - `production` environment with prod secrets

3. **Set environment-specific secrets:**
   
   **Development:**
   - `MONGODBNAME=testTpen`
   - `RERUMURL=https://devstore.rerum.io/v1`
   - `REPO_NAME=TPEN-Static-Dev`
   - `CORS_ORIGINS=https://app.t-pen.org,https://dev.app.t-pen.org,http://localhost:8080`
   
   **Production:**
   - `MONGODBNAME=tpen`
   - `RERUMURL=https://store.rerum.io/v1`
   - `REPO_NAME=TPEN-static`
   - `CORS_ORIGINS=https://app.t-pen.org,https://dev.app.t-pen.org`

4. **Test smoke tests locally:**
   ```bash
   npm start
   # In another terminal:
   SMOKE_TEST_URL=http://localhost:3001 node __tests__/smoke.test.mjs
   ```

---

## GitHub Actions Workflow Notes

### Environment Validation Errors

The workflow files now reference GitHub Environments (`development` and `production`). These environments must be created in GitHub repository settings before the workflows will execute successfully.

Current validation errors are expected because:
1. GitHub Environments don't exist yet in the repositories
2. The `SpicyPizza/create-envfile@v2` action schema validation doesn't recognize the additional `envkey_*` parameters until the secrets are defined

### Creating GitHub Environments

For each repository (TPEN-interfaces, TPEN-services):

1. Go to Settings → Environments
2. Create `development` environment
   - Add all dev secrets
   - Optional: Restrict to `development` branch
3. Create `production` environment
   - Add all prod secrets
   - Restrict to `main` branch
   - Optional: Add required reviewers for prod deploys

---

## Testing the Changes

### Local Testing - TPEN-interfaces

```bash
cd TPEN-interfaces
cp .env.development .env.local
# Edit .env.local with your values
# Start your dev server (Vite, webpack, etc.)
# Check browser console for "TPEN Configuration:" log
```

### Local Testing - TPEN-services

```bash
cd TPEN-services
cp .env.development .env
# Edit .env with your database credentials
npm install cors  # If not already installed
npm start

# In another terminal:
curl http://localhost:3001/
# Should return HTML with "TPEN3 SERVICES BABY!!!"

SMOKE_TEST_URL=http://localhost:3001 node __tests__/smoke.test.mjs
# Should pass all smoke tests
```

---

## Migration Path

### Phase 1: Preparation (Complete)
- ✅ Configuration infrastructure created
- ✅ Environment templates provided
- ✅ Documentation written
- ✅ Smoke tests implemented
- ✅ CI workflows updated

### Phase 2: GitHub Setup (Next)
- [ ] Create GitHub Environments in both repos
- [ ] Add environment-specific secrets
- [ ] Test workflows with dummy commits

### Phase 3: DNS/Infrastructure
- [ ] Provision `dev.app.t-pen.org` (interfaces dev)
- [ ] Verify DNS for `api.t-pen.org` and `dev.api.t-pen.org`
- [ ] Verify SSL certificates

### Phase 4: Deployment
- [ ] Deploy development branch to dev environments
- [ ] Verify end-to-end dev flow
- [ ] Deploy main branch to production environments
- [ ] Monitor and validate

---

## Key Differences: Development vs Production

| Component | Development | Production |
|-----------|-------------|------------|
| **Interfaces URL** | dev.app.t-pen.org | app.t-pen.org |
| **Services URL** | dev.api.t-pen.org | api.t-pen.org |
| **MongoDB Database** | testTpen | tpen |
| **RERUM Store** | devstore.rerum.io/v1 | store.rerum.io/v1 |
| **Static Repo** | TPEN-Static-Dev | TPEN-static |
| **Static URL** | dev.static.t-pen.org | static.t-pen.org |
| **CORS Origins** | Includes localhost | Production domains only |
| **Auth0 Tenant** | Dev tenant | Prod tenant |

---

## Rollback Strategy

If issues occur after deployment:

1. **Immediate:** Point DNS back to previous deployment
2. **Code:** Revert commits and redeploy
3. **Config:** GitHub Environments allow quick secret updates without redeployment
4. **Database:** Use backups of `testTpen` and `tpen` databases

---

## Files Summary

### Created Files

**TPEN-interfaces:**
- `js/config.js`
- `.env.development`
- `.env.production`
- `CONFIG.md`

**TPEN-services:**
- `.env.development`
- `.env.production`
- `CONFIG.md`
- `__tests__/smoke.test.mjs`

**TPEN3:**
- `docs/production-launch-checklist.md` (original checklist)
- `docs/IMPLEMENTATION.md` (this file)

### Modified Files

**TPEN-interfaces:**
- `api/TPEN.js`

**TPEN-services:**
- `sample.env`
- `app.js`
- `.github/workflows/cd_dev.yaml`
- `.github/workflows/cd_prod.yaml`

---

## Additional Recommendations

1. **Add CORS package to package.json:**
   ```bash
   cd TPEN-services
   npm install cors --save
   ```

2. **Document Auth0 setup:** Create separate Auth0 applications/APIs for dev and prod

3. **Monitor after deploy:** Watch logs for CORS errors and connection issues

4. **Database migrations:** Plan for any schema differences between `testTpen` and `tpen`

5. **Static repo access:** Ensure GitHub token has write access to both TPEN-static and TPEN-Static-Dev

---

## Questions or Issues?

Refer to:
- `TPEN-interfaces/CONFIG.md` for frontend configuration
- `TPEN-services/CONFIG.md` for backend configuration
- `TPEN3/docs/production-launch-checklist.md` for overall launch checklist
- Each `.env.development` and `.env.production` file for variable templates
