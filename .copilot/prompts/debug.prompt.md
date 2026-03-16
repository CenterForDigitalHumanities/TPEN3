---
description: Find root cause quickly and produce a verified fix
mode: agent
---
# RCG /debug

Perform a structured debugging session.

Intent: Find root cause quickly and produce a verified fix.

## Required inputs
Before proceeding, ensure you have the following. If any are missing, ask the user to provide them:
- Observed behavior
- Expected behavior
- Reproduction steps
- Relevant logs, traces, or error output
- Impacted environment and version details

## Workflow
1. Ask the user for observed behavior, expected behavior, and repro steps if not already provided.
2. Analyze the relevant code to isolate the likely subsystem and failure point.
3. Form 2 to 3 ranked hypotheses and explain your reasoning.
4. Validate hypotheses by reading code, checking logs, or running targeted tests.
5. Implement the smallest fix that resolves the root cause.
6. Add or update regression test coverage.
7. Run the reproduction steps and test suite to confirm the fix.

## Constraints
- No speculative fixes without evidence.
- Keep a clear chain from symptom to cause to fix.

## Exit criteria
- Root cause identified and fix validated.
- Regression coverage added.
- Risk and confidence documented.

Paste-ready summary:
```
Root cause: ...
Fix: ...
Validation: ...
Risk: ...
```
