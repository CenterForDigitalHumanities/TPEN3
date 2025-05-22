---
layout: default
title: Core Workflow Interfaces Planning
description: Planning and visualization of core workflow interfaces using Mermaid.
permalink: /workflow
---

## Core Workflow Interfaces Planning

This page visualizes the core workflow interfaces in the TPEN Application. This is a work in progress and will be updated as the workflow evolves.

```mermaid
flowchart TD
    LandingPage([Landing Page])
    Recents([Recent Activity])
    List([Project List])
    Detail([Project Detail])
    ExportLink([Export Links])
    EditDesc([Edit/Read Description])
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

    Recents --> Detail
    Recents --> Transcribe
    subgraph LandingPage[Landing Page]
        direction LR
        Recents
        List
        subgraph ActionLinks[ Tasks Links ]
            direction TB
            NewProject
            ImportResource
            LinkAccount
            ManageProfile
        end
    end
    List --> Detail
    List --> |if Role| Management
    Detail --> d{Role?}
    d --> |Leader| Config
    d --> |Leader| Options
    d --> |Leader| Management
    d --> |Contributor| Transcribe
    Management <--> |if Role| PageLayers
    Management <--> |if Leader| ManageUsers
    Management <--> |if Role| Interfaces
    Management <--> EditDesc
    Management --> ExportLink
    Management --> Options
    Management --> Config
    ManageUsers <--> AddUsers
    ManageUsers <--> DefineRoles
    Config --> DefineLines
    Config --> Tools
    Options --> Annotate
    Transcribe --> Annotate
```

> **Note:** Update this chart as new interfaces or workflow steps are defined.

---

## General Roles

```mermaid
flowchart TD
    %% Swimlanes as subgraphs for each role
    subgraph Leader
        direction TB
        LeaderManagement([Project Management])
        LeaderConfig([Project Configuration])
        LeaderOptions([Project Options])
        LeaderEditDesc([Edit/Read Description])
        LeaderManageUsers([Manage Users & Roles])
        LeaderAddUsers([Add Users])
        LeaderDefineRoles([Define Roles])
        LeaderExport([Export Links])
    end
    subgraph Contributor
        direction TB
        ContributorTranscribe([Transcription])
        ContributorAnnotate([Specialized Annotation])
        ContributorDefineLines([Define Lines])
    end
    subgraph Viewer
        direction TB
        ViewerList([Project List])
        ViewerDetail([Project Detail])
        ViewerRecents([Recent Activity])
    end

    %% Leader flows
    LeaderManagement --> LeaderConfig
    LeaderManagement --> LeaderOptions
    LeaderManagement --> LeaderEditDesc
    LeaderManagement --> LeaderManageUsers
    LeaderManageUsers --> LeaderAddUsers
    LeaderManageUsers --> LeaderDefineRoles
    LeaderConfig --> LeaderExport
    LeaderOptions --> ContributorAnnotate
    LeaderOptions --> LeaderEditDesc
    LeaderConfig --> ContributorDefineLines

    %% Contributor flows
    ContributorTranscribe --> ContributorAnnotate
    ContributorDefineLines --> ContributorTranscribe


    %% Viewer flows
    ViewerList --> ViewerDetail
    ViewerRecents --> ViewerDetail
    ViewerDetail --> LeaderEditDesc
    ViewerDetail --> ContributorTranscribe

```

> **Swimlane Example:** This chart groups interfaces by user role (Leader, Contributor, Viewer) into swimlanes.

## Task Flow Summaries

### Creating a New Project and Inviting Members

This section outlines the steps a user follows to create a new project and invite members in the TPEN Application.

```mermaid
flowchart LR
    LandingPage([Landing Page])
    NewProject([Create a New Project])
    Management([Project Mangement])
    ManageUsers([Manage Users & Roles])
    AddUsers([Add Users])
    DefineRoles([Define Roles])

    LandingPage --> NewProject
    NewProject --> Management
    Management --> ManageUsers
    ManageUsers --> DefineRoles
    DefineRoles --> AddUsers 
```

**Summary of Steps:**

1. User navigates to the Landing Page.
2. Selects "Create New Project".
3. Configures project details and saves the project.
4. Accesses the Project Management page.
5. Opens "Manage Users & Roles".
6. Defines any custom roles.
7. Adds members to the project with roles.
8. Sends invitations to new members.

> **Note:** This flow can be updated as new features or steps are introduced.

### Continue Transcribing an Existing Project

This section outlines the steps a user follows to continue transcribing in an existing project in the TPEN Application.

```mermaid
flowchart LR
    LandingPage([Landing Page])
    ProjectList([Project List])
    Transcribe([Transcription])
    Annotate([Specialized Annotation])

    LandingPage --> ProjectList
    ProjectList --> Transcribe
    Transcribe --> Annotate
```

**Summary of Steps:**

1. User navigates to the Landing Page.
2. Selects a project from the Project List, clicking to transcribe.
3. Continues transcribing in the Transcription interface.
4. Optionally, adds annotations.

> **Note:** This flow can be updated as new features or steps are introduced.
