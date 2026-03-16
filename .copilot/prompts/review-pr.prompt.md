---
description: Risk-first pull request review for correctness and release safety
mode: ask
---
# RCG /review-pr

Perform a risk-first pull request review focused on correctness and release safety, not style.

Intent: Risk-first pull request review for correctness and release safety.

## Required inputs
Before proceeding, ensure you have the following. If any are missing, ask the user to provide them:
- Pull request title and description
- Linked issues or tickets
- Changed files or diff
- CI status and test results
- Target release context (if applicable)

## Workflow
1. Ask the user for the PR link or diff if not already provided.
2. Read the PR description, linked issues, changed files, and CI status.  If there are no changed files let the requestor know there is nothing to review.
3. Identify correctness, regression, security, and operability risks, ordered by severity.
4. Assess test adequacy for the changed behavior.
5. Recommend concrete edits and list any missing tests.
6. Provide an explicit go or no-go recommendation with justification.

## Constraints
- Findings first, ordered by severity.
- No style feedback unless requested.
- Avoid revealing secrets or private data.

Severity scale:
- Critical
- High
- Medium
- Low

## Exit criteria
- Risks and findings documented.
- Suggested fixes
- Go or no-go
- Confidence and unknowns

Paste-ready summary:
```
Verdict: ...
Critical: ...
High: ...
Tests: ...
Risk: ...
```
