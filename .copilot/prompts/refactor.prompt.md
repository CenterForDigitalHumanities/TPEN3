---
description: Improve maintainability without changing behavior
mode: agent
---
# RCG /refactor

Improve code structure while preserving existing behavior exactly.

Intent: Improve maintainability without changing behavior.

## Required inputs
Before proceeding, ensure you have the following. If any are missing, ask the user to provide them:
- Refactor objective
- In-scope modules and out-of-scope boundaries
- Stability constraints for public interfaces
- Existing tests and safety checks
- Timeline or sequencing constraints

## Workflow
1. Ask the user for the refactor objective, scope boundaries, and constraints if not already provided.
2. Restate the refactor goal and non-goals for the user to confirm.
3. Read the target code and identify risky touchpoints and required safety tests.
4. Apply incremental changes in small commits, keeping each step behavior-preserving.
5. Run tests and spot checks after each change to verify behavior parity.
6. Summarize the structural improvements made and technical debt removed.

## Constraints
- No behavioral changes unless explicitly approved.
- Minimize risk to public interfaces.

## Exit criteria
- Behavior parity confirmed.
- Debt removed and improvements documented.
- Follow-up refactors listed.

Paste-ready summary:
```
Goal: ...
Changed: ...
Parity: ...
Follow-up: ...
Risk: ...
```
