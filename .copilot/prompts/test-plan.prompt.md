---
description: Build a focused test plan for a feature, bugfix, or release candidate
mode: ask
---
# RCG /test-plan

Build a risk-prioritized test plan that balances coverage with effort.

Intent: Build a focused test plan for a feature, bugfix, or release candidate.

## Required inputs
Before proceeding, ensure you have the following. If any are missing, ask the user to provide them:
- Feature, bugfix, or release scope
- Acceptance criteria
- Known risk areas
- Environment matrix requirements
- Automation constraints

## Workflow
1. Ask the user for the scope, acceptance criteria, and known risk areas if not already provided.
2. Identify critical user flows and edge cases from the provided scope.
3. Define the unit, integration, and end-to-end checks needed for each flow.
4. Include negative and failure-mode scenarios for high-risk paths.
5. Map each test case to the risk areas and acceptance criteria it covers.
6. Mark which tests can be automated now vs later, with rationale.

## Constraints
- Prioritize high-risk paths first.
- Document gaps and mitigation.

## Exit criteria
- Test plan covers critical flows and risks.
- Automation candidates identified.
- Gaps and mitigation documented.

Paste-ready summary:
```
Scope: ...
Cases: ... (count)
Automated: ... (count)
Gaps: ...
Risk: ...
```
