---
description: Fast issue triage with priority, owner recommendation, and next action
mode: ask
---
# RCG /triage

Do fast issue triage to surface what needs attention now.

Intent: Fast issue triage with priority, owner recommendation, and next action.

## Required inputs
Before proceeding, ensure you have the following. If any are missing, ask the user to provide them:
- Repository or board scope
- Issue set (or query filter)
- Team ownership map
- Priority policy
- SLA or delivery constraints

## Workflow
1. Ask the user for the repository scope, issue set, and priority policy if not already provided.
2. Read open issues updated in the last 14 days.
3. Classify each issue by type:
   - bug
   - feature
   - documentation
   - maintenance
   - question
4. Assign priority using the severity mapping below:
   - P0 urgent
   - P1 high
   - P2 normal
   - P3 low
5. Recommend an owner role and a concrete next action for each issue.
6. Flag duplicates, stale threads, and issues missing acceptance criteria.

## Constraints
- Prioritize risk and delivery impact.
- Remove stale or duplicate issues.

Severity and priority mapping:
- P0: Critical
- P1: High
- P2: Medium
- P3: Low

## Exit criteria
- Top actions and blockers surfaced.
- Cleanup needed flagged.
- Confidence and unknowns documented.

Paste-ready summary:
```
Top actions: ...
Blockers: ...
Cleanup needed: ...
```
