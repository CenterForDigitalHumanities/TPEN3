---
layout: default
title: Core Workflow Interfaces Planning
description: Planning and visualization of core workflow interfaces using Mermaid.
permalink: /workflow
---

# Core Workflow Interfaces Planning

This page uses Mermaid to visualize the core workflow interfaces. This is a work in progress and will be updated as the workflow evolves.

```mermaid
flowchart TD
    Start([Start])
    Login([User Login])
    Project([Project Selection])
    Transcribe([Transcription])
    Review([Review])
    Finish([Finish])

    Start --> Login
    Login --> Project
    Project --> Transcribe
    Transcribe --> Review
    Review --> Finish
```

> **Note:** Update this chart as new interfaces or workflow steps are defined.
