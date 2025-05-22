---
layout: default
title: Core Workflow Interfaces Planning
description: Planning and visualization of core workflow interfaces using Mermaid.
permalink: /workflow
---

# Core Workflow Interfaces Planning

This page visualizes the core workflow interfaces in the TPEN Application. This is a work in progress and will be updated as the workflow evolves.

```mermaid
flowchart TD
    LandingPage([Landing Page])
    Recents([Recent Activity])
    List([Project List])
    Detail([Project Detail])
    ExportLink([Export Links])
    EditDesc([Edit Project Description])
    Config([Project Configuration])
    Options([Project Options])
    Tools([Project Tools])
    Interfaces([Default Project Interfaces])
    Management([Project Management])
    PageLayers([Organize Pages and Layers])
    ManageUsers([Manage Users & Roles])
    AddUsers([Add Users])
    DefineRoles([Define Roles])
    Transcribe([Transcription])
    DefineLines([Define Lines])
    Annotate([Specialized Annotation])
    NewProject([Create a New Project])
    ImportResource([Import a Resource])
    LinkAccount([Link TPEN 2.8 Account])
    ManageProfile([Manage Profile/Password])


    subgraph LandingPage[Landing Page]
        direction LR
        Recents
        List
        subgraph ActionLinks[ Action Links ]
            direction TB
            NewProject
            ImportResource
            LinkAccount
            ManageProfile
        end
    end
    Recents --> Transcribe
    Recents --> Detail
    List --> Detail
    List --> Management
    List --> Config
    List --> Options
    Detail --> Config
    Detail --> Options
    Detail --> Management
    Management --> PageLayers
    Management --> ManageUsers
    Management --> Tools
    Management --> Interfaces
    Management --> EditDesc
    ManageUsers --> AddUsers
    ManageUsers --> DefineRoles
    Config --> DefineLines
    Config --> ExportLink
    Options --> Annotate
    Options --> EditDesc
    Tools --> Transcribe
    Tools --> Annotate
    Interfaces --> Transcribe
    Interfaces --> Annotate
    EditDesc --> Management
    PageLayers --> Management
    AddUsers --> ManageUsers
    DefineRoles --> ManageUsers
    ExportLink --> Config
    Transcribe --> Tools
    Annotate --> Tools
```

> **Note:** Update this chart as new interfaces or workflow steps are defined.
