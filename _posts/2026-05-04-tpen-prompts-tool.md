---
title: "Introducing TPEN-Prompts: AI-Assisted Transcription"
excerpt: "A new split-screen tool that builds well-formatted LLM prompts carrying live TPEN project context."
date: "2026-05-04"
categories:
  - "announcements"
tags:
  - "ai"
  - "prompts"
  - "tools"
author: "Bryan Haberberger"
tldr: |
  **TPEN-Prompts is now public:**
  - An AI prompt generator that drops into the TPEN transcription workspace
  - Composes ready-to-paste prompts for line detection, column grouping, and transcription
  - Does **not** call any LLM directly — copy the prompt into your favorite chat or CLI
---

## What is TPEN-Prompts?

[TPEN-Prompts](https://github.com/CenterForDigitalHumanities/TPEN-Prompts) is a GitHub Pages app that composes well-formatted LLM prompts pre-loaded with your TPEN project context. It is a **prompt builder, not a model client** — it never calls an LLM and never sends your work to a third party. You pick a task, the tool emits a prompt, you paste it into whichever AI you already trust.

That distinction matters. AI is moving fast, model preferences are personal, and many institutions have policies about which providers their data can touch. TPEN-Prompts stays out of that decision. Use ChatGPT, Claude, Gemini, a self-hosted model, or a local CLI like `claude` or `codex` — TPEN-Prompts produces the same well-grounded prompt either way.

## What it can do

The tool ships with a small library of task templates aimed at the most common manuscript-prep chores:

- **Line Detection** — find every text line on a page and save bounding boxes
- **Column Grouping** — organize an already-detected line set into reading-order columns
- **Line-By-Line Transcription** — recognize and record line text

The AI is given all the context it needs to work and write back to TPEN. If the AI can make HTTP requests, it communicates results directly to TPEN Services. If it cannot, the prompt instructs the AI to emit a compact JSON payload that you can paste back into the split-screen tool which can access TPEN Services instead.

## Using it inside TPEN

The tool is designed for the transcription workspace as a split-screen tool.  Project leaders can register TPEN-Prompts as one of their project's tools on the Project Management page.  Once configured, contributors will see it alongside the other workspace tools.  

When opened via the Transcription Interface, TPEN hands the tool a context-filled payload so prompt generation is instant. Any data the AI produces is written through TPEN Services, so it lands as proper linked open data — W3C Web Annotation and IIIF compliant.

Step-by-step setup and an inventory of existing prompt templates are all documented in the project README.

- [TPEN-Prompts README on GitHub](https://github.com/CenterForDigitalHumanities/TPEN-Prompts#readme)

## AI as a Tool

TPEN is built around portable, standards-based data — IIIF Manifests, Web Annotations, public APIs. TPEN-Prompts extends that ethos to the AI layer. Your transcription is yours, your model choice is yours, and the glue between them is a transparent prompt you can read, edit, and save. We think this is a good model of AI assistance in scholarly transcription that includes human-in-the-loop principles. The work that is produced is rightfully attributed to you as the author. You are accountable to the outcome, like all the work that you do.

- Tool: <https://centerfordigitalhumanities.github.io/TPEN-Prompts/>
- Repo & docs: <https://github.com/CenterForDigitalHumanities/TPEN-Prompts>
- Feedback: [TPEN-Prompts issues](https://github.com/CenterForDigitalHumanities/TPEN-Prompts/issues) or [TPEN discussions](https://github.com/CenterForDigitalHumanities/TPEN3/discussions)
