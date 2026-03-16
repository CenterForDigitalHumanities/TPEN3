---
description: Plan and execute a safe schema or data migration
mode: ask
---
# RCG /migration

Plan a safe, reversible migration with zero data loss.

Intent: Plan and execute a safe schema or data migration.

## Required inputs
Before proceeding, ensure you have the following. If any are missing, ask the user to provide them:
- Current schema or data shape
- Target schema or data shape
- Data volume and criticality
- Availability and downtime constraints
- Rollback constraints

## Workflow
1. Ask the user for the current and target schema, volume, and constraints if not already provided.
2. Compare current and target shapes and identify all breaking changes.
3. Define backward and forward compatibility requirements.
4. Prepare numbered migration steps, each with a corresponding rollback path.
5. Add validation and data integrity checks for each step.
6. Recommend a staging-first execution strategy with cutover criteria.
7. Document post-deploy verification steps and owners.

## Constraints
- Always include rollback or fail-safe strategy.
- No data loss or downtime unless explicitly approved.

## Exit criteria
- Migration plan is safe and reversible.
- Data integrity checks included.
- Risks and downtime documented.

Paste-ready summary:
```
Migration: ...
Breaking changes: ...
Rollback: ...
Downtime: ...
Risk: ...
```
