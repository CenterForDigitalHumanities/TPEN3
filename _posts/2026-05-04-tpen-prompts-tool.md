---
title: "Introducing TPEN-Prompts: AI-Assisted Transcription, on Your Terms"
excerpt: "A new split-screen tool that builds well-formatted LLM prompts carrying live TPEN3 project context — bring your own AI, keep your data your own."
date: "2026-05-04"
categories:
  - "announcements"
tags:
  - "ai"
  - "prompts"
  - "tools"
author: "TPEN Team"
tldr: |
  **TPEN-Prompts is now public:**
  - An AI prompt generator that drops into the TPEN3 transcription workspace
  - Composes ready-to-paste prompts for line detection, column grouping, and transcription
  - Does **not** call any LLM — copy the prompt into your favorite chat or CLI
---

## What is TPEN-Prompts?

[TPEN-Prompts](https://github.com/CenterForDigitalHumanities/TPEN-Prompts) is a GitHub Pages app that composes well-formatted LLM prompts pre-loaded with your TPEN3 project context. It is a **prompt builder, not a model client** — it never calls an LLM and never sends your work to a third party. You pick a task, the tool emits a prompt, you paste it into whichever AI you already trust.

That distinction matters. AI is moving fast, model preferences are personal, and many institutions have policies about which providers their data can touch. TPEN-Prompts stays out of that decision. Use ChatGPT, Claude, Gemini, a self-hosted model, or a local CLI like `claude` or `codex` — TPEN-Prompts produces the same well-grounded prompt either way.

## What it can do

The tool ships with a small library of task templates aimed at the most common manuscript-prep chores:

- **Line Detection** — find every text line on a page and save bounding boxes
- **Group Existing Lines Into Columns** — organize an already-detected line set into reading-order columns
- **Line Detection + Column Grouping** — both of the above in one pass
- **Transcribe Over Existing Lines** — fill in transcription text for lines that already exist
- **Line Detection + Transcription** — detect and transcribe a fresh page end-to-end
- **Line Detection + Column Grouping + Transcription** — the whole pipeline in one prompt

Each template inlines the canvas IRI, image URL, page endpoint, image dimensions, and (when you authorize it) a TPEN auth token.  The assistant has everything it needs to work and write back to TPEN. If the AI can make HTTP requests, it can `PUT` or `POST` results directly to TPEN Services. If it cannot, the prompt instructs the LLM to emit a compact JSON payload.  You can copy that JSON and bring it back to splitscreen tool to persist the data.

## Using it inside TPEN3

The tool is designed for the transcription workspace as a split-screen tool. When opened from inside a project at [app.t-pen.org](https://app.t-pen.org), TPEN hands the tool a context-filled payload (project, page, canvas, current line) so prompt generation is instant.  This prompt has all the context an LLM needs to do the work.

Project leaders can register TPEN-Prompts as one of their project's tools. Once configured, contributors will see it alongside the other workspace tools and can launch it whenever they want an AI nudge. Step-by-step setup, the postMessage contract, the standalone URL-parameter mode, and an inventory of templates are all documented in the project README.

> Read the setup guide: [TPEN-Prompts README on GitHub](https://github.com/CenterForDigitalHumanities/TPEN-Prompts#readme)

## A note on philosophy

TPEN3 is built around portable, standards-based data — IIIF Manifests, Web Annotations, public APIs. TPEN-Prompts extends that ethos to the AI layer. Your transcription is yours, your model choice is yours, and the glue between them is a transparent prompt you can read, edit, and save. We think this is a good model of AI assistance in scholarly transcription that includes human-in-the-loop principles.  

- Tool: <https://centerfordigitalhumanities.github.io/TPEN-Prompts/>
- Repo & docs: <https://github.com/CenterForDigitalHumanities/TPEN-Prompts>
- Feedback: [TPEN-Prompts issues](https://github.com/CenterForDigitalHumanities/TPEN-Prompts/issues) or [TPEN3 discussions](https://github.com/CenterForDigitalHumanities/TPEN3/discussions)
