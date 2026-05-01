---
description: Generate monthly release notes for the TPEN3 Early Access period from GitHub commit and PR activity
agent: agent
---
# /release-notes

Generate a monthly release notes post for the TPEN 3 platform, summarizing activity across all active repositories for the previous calendar month.

## Repositories to review

Query each of the following repos under the `CenterForDigitalHumanities` GitHub organization:

- TPEN-services
- TPEN-interfaces
- TPEN-Static
- TPEN-Prompts
- tpen-line-history
- TinyPen
- TPEN3
- Line-Detection
- TPEN-Browser
- Preview-Transcription
- Page-Viewer
- Compare-Pages
- Line-Breaking
- Github-Manifests

## Data collection

For each repo, fetch:
1. All commits between the first and last day of the target month via the GitHub API (`/repos/{org}/{repo}/commits?since=...&until=...`)
2. All merged pull requests for the same period (`/repos/{org}/{repo}/pulls?state=closed`)
3. PR titles and body summaries to understand intent

Use the GitHub REST API through the terminal. The API base URL is `https://api.github.com`. No auth token is required for public repos; set `User-Agent: TPEN-Release-Notes`.

## Output format

Create a new Jekyll post at `_posts/YYYY-MM-DD-release-notes-{month}-{year}.md` where the date is the **first day of the following month** (publication date).

### Frontmatter
```yaml
---
title: "Release Notes: {Month} {Year} (Early Access Month N)"
date: "YYYY-MM-01"
categories:
  - "release-notes"
author: "Copilot"
tldr: |
  **{Month} {Year} highlights:**
  - [3-5 bullet summary of the most impactful changes]
---
```

### Body structure
1. **Opening paragraph** (2–4 sentences): Characterize the month's overall activity themes — what kinds of work dominated (new features, bug fixing, infrastructure, AI tooling, etc.) and any headline additions.
2. **Per-repo sections**: For each repo that had activity, add an H2 section (`## Repo-Name`) with a bullet or short paragraph per meaningful change. Group closely related commits under one item. Skip routine `chore:` or auto-generated commits unless they represent significant infrastructure work.
3. **Inactive repos**: End with a single italicized line listing repos with no activity.

## Post guidelines

- Write in third-person, present-tense technical prose.
- Link to PRs where available: `[#NNN](https://github.com/CenterForDigitalHumanities/REPO/pull/NNN)`.
- Keep each change item to 1–3 sentences.
- Do not speculate about intent beyond what commit messages and PR bodies describe.
- Author is always `Copilot`.

## Index page

Ensure `pages/release-notes.md` exists with this content (create if absent):
```yaml
---
layout: category
category: release-notes
permalink: category/release-notes/
---
```
Followed by a short description of the release-notes category.

## Early Access month counter

The first release-notes post (covering April 2026) is **Month 1**. Increment by 1 for each subsequent monthly post.
