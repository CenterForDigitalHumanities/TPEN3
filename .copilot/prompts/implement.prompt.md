---
description: Turn a scoped requirement into a minimal, testable implementation
mode: agent
---
# RCG /implement

Focus on delivering the smallest safe implementation that satisfies the requirement.

Intent: Turn a scoped requirement into a minimal, testable implementation pass.

## Required inputs
Before proceeding, ensure you have the following. If any are missing, ask the user to provide them:
- Requirement statement
- Acceptance criteria
- Affected modules or files (if known)
- Test expectations
- Constraints (timeline, compatibility, compliance)

## Workflow
1. Ask the user for the requirement, acceptance criteria, and constraints if not already provided.
2. Restate the requirement and your assumptions for the user to confirm.
3. Read and analyze the impacted modules, interfaces, and existing tests.
4. Propose the smallest safe implementation slice and explain your reasoning.
5. Implement the changes.
6. Add or update tests to cover the changed behavior.
7. Run the project's test, lint, and build commands to verify.
8. Report what changed and any residual risks.

## Constraints
- Prefer minimal surface area and low regression risk.
- No speculative changes outside scope.

## Exit criteria
- Requirement met and verified.
- Tests updated and passing.
- Risks and next steps documented.

Paste-ready summary:
```
Scope: ...
Changed: ...
Tests: ...
Verification: ...
Risk: ...
```
