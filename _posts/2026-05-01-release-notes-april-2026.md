---
title: "Release Notes: April 2026 (Early Access Month 1)"
date: "2026-05-01"
categories:
  - "release-notes"
author: "Copilot"
tldr: |
  **April 2026 highlights:**
  - AI-assisted transcription launched via new TPEN-Prompts tool
  - Major image quality and IIIF compatibility improvements in Simple Transcription
  - Several UX fixes and messaging improvements across interfaces
  - Github-Manifests repository introduced for IIIF manifest generation
  - TinyPen expanded with generated test coverage
---

The first month of TPEN 3 Early Access was defined by two parallel themes: **AI integration** and **interface polish**. The headline addition is the debut of TPEN-Prompts, a new LLM-assisted transcription tool that shipped from scratch and received several rapid tuning iterations before the end of the month. Meanwhile, the core Simple Transcription interface saw meaningful improvements in image resolution handling, IIIF compatibility, and a handful of targeted bug fixes surfaced by real-user sessions. A new utility repository — Github-Manifests — also appeared, automating IIIF manifest generation for GitHub-hosted image collections.

---

## TPEN-interfaces

**TPEN AI Prompt Generator** — A new split-screen tool launches an LLM-assisted transcription workflow directly from the interface. The tool passes hydrated TPEN context (project, canvas, and line data) to a prompt pane, reducing the burden on the model to re-fetch or re-interpret data. ([#524](https://github.com/CenterForDigitalHumanities/TPEN-interfaces/pull/524), [#525](https://github.com/CenterForDigitalHumanities/TPEN-interfaces/pull/525))

**Higher-resolution IIIF images in viewer** — The Simple Transcription viewer now probes for higher-resolution image candidates via IIIF service info, path rewrites, and query parameter adjustments before falling back to the original URL. A new `imageUpgradeUrl.js` utility manages prioritized, deduplicated candidate URLs, and stale in-flight loads are cancelled cleanly. ([#534](https://github.com/CenterForDigitalHumanities/TPEN-interfaces/pull/534))

**Image visible even with no lines** — Fixed a regression where the Simple Transcription viewer showed a blank/broken-image placeholder when an AnnotationPage contained zero line annotations. The image now loads correctly regardless of whether lines are present. ([#540](https://github.com/CenterForDigitalHumanities/TPEN-interfaces/pull/540))

**Project title shown on /annotator** — The Annotorious annotator interface now surfaces the project title, providing better orientation for annotators working across multiple projects. ([#532](https://github.com/CenterForDigitalHumanities/TPEN-interfaces/pull/532))

**Decline page no longer requires login** — The `/project/decline/` route previously forced unauthenticated visitors through the login flow. The page now handles the decline action without requiring authentication. ([#531](https://github.com/CenterForDigitalHumanities/TPEN-interfaces/pull/531))

**Hotfix: splitscreen tool panes not loading** — A messaging regression caused tool panes in the splitscreen interface to stop receiving `TPEN_CONTEXT`. This was resolved by simplifying the handshake to rely solely on the `TPEN_CONTEXT` message channel. ([#538](https://github.com/CenterForDigitalHumanities/TPEN-interfaces/pull/538))

**IIIF manifest import from query string** — Interfaces can now bootstrap from a manifest URI passed as a query parameter, making it easier to link directly into a transcription session. ([#522](https://github.com/CenterForDigitalHumanities/TPEN-interfaces/pull/522))

**`manage-columns` pixel prefix fix** — A rendering defect caused columns with `pixel:` prefixes in `#xyhw=` selectors to display incorrectly. The fix ensures consistent rendering for both prefixed and unprefixed values.

---

## TPEN-Prompts

**Initial launch** — TPEN-Prompts shipped as a net-new repository this month, providing a split-tool scaffold for manuscript transcription with LLM assistance. The initial implementation included project structure, contribution guidelines, runtime module organization, and a working prompt-to-transcription flow.

**Prompt tuning (×2)** — Two rounds of prompt refinement improved output quality and reliability during demo and real-user testing. ([#4](https://github.com/CenterForDigitalHumanities/TPEN-Prompts/pull/4), [#7](https://github.com/CenterForDigitalHumanities/TPEN-Prompts/pull/7))

**JSON-paste fallback restored** — The submission flow for pasting raw JSON output was temporarily broken and has been restored. ([#6](https://github.com/CenterForDigitalHumanities/TPEN-Prompts/pull/6))

**Column creation fallback** — Added a fallback strategy for creating columns when the primary detection path is unavailable. ([#9](https://github.com/CenterForDigitalHumanities/TPEN-Prompts/pull/9))

---

## Github-Manifests

**New repository launched** — Github-Manifests is a new utility repository that automatically generates IIIF manifests for image collections hosted on GitHub. It supports absolute manifest URL embedding, repo slug detection, a project index in the generated README, and includes a direct TPEN3 import link per manifest.

---

## TinyPen

**Generated test cases** — A suite of generated test cases was added, expanding coverage for the lightweight TinyPen transcription widget. ([#35](https://github.com/CenterForDigitalHumanities/TinyPen/pull/35))

---

## TPEN3 (this site)

Minor content and icon fixes (`inconis restoro`, housekeeping).

---

## TPEN-Static

Two new IIIF canvas manifests were created for hosted test/demo content.

---

*Repos with no activity this month: TPEN-services, tpen-line-history, Line-Detection, TPEN-Browser, Preview-Transcription, Page-Viewer, Compare-Pages, Line-Breaking.*
