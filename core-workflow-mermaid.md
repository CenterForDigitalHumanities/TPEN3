---
layout: default
title: Core Workflow Interfaces Planning
description: Planning and visualization of core workflow interfaces using Mermaid.
permalink: /workflow
---

## Core Workflow Interfaces Planning

This page visualizes the core workflow interfaces in the TPEN Application. This is a work in progress and will be updated as the workflow evolves.

---

## TPEN Navigation Map

This diagram shows how the documentation site (t-pen.org) and the application interfaces (app.t-pen.org) interlink, providing a complete navigation overview of the TPEN ecosystem.

```mermaid
graph TB
    %% Documentation Site (t-pen.org)
    subgraph DocSite["Documentation Site (t-pen.org)"]
        Home([Home/Landing Page])
        GettingStarted([Getting Started])
        Tutorials([Tutorials])
        About([About])
        API([API Docs])
        Workflow([Workflow Diagrams])
        Announcements([Announcements])
        Roadmap([Roadmap])
        Beta([Beta Program])
    end
    
    %% Authentication Layer
    subgraph Auth["Authentication"]
        Login([Login/Sign Up])
        Logout([Logout])
        Callback([OAuth Callback])
        Auth0[Auth0 Service]
    end
    
    %% Application Interfaces (app.t-pen.org)
    subgraph AppInterfaces["Application (app.t-pen.org)"]
        direction TB
        AppHome([Landing/Dashboard])
        
        subgraph ProjectViews["Project Views"]
            ProjectList([Project List])
            RecentActivity([Recent Activity])
            ProjectDetail([Project Detail])
        end
        
        subgraph ProjectManagement["Project Management"]
            Management([Management Interface])
            ManageUsers([Manage Users & Roles])
            PageLayers([Organize Pages/Layers])
            ProjectConfig([Project Configuration])
            ProjectOptions([Project Options])
            EditDesc([Edit Description])
        end
        
        subgraph CoreWorkflow["Core Transcription Workflow"]
            Transcribe([Transcription Interface])
            DefineLines([Define Lines])
            Annotate([Specialized Annotation])
        end
        
        subgraph ProjectActions["Project Actions"]
            NewProject([Create New Project])
            ImportResource([Import Resource])
            ExportLinks([Export/Share])
        end
        
        subgraph UserManagement["User Management"]
            ManageProfile([Manage Profile])
            LinkAccount([Link TPEN 2.8 Account])
        end
    end
    
    %% External Services
    subgraph External["External Services"]
        RERUM[(RERUM Repository)]
        IIIF[IIIF Image Services]
        WebAnnotation[Web Annotation Standard]
    end
    
    %% Documentation Site Navigation
    Home --> GettingStarted
    Home --> Tutorials
    Home --> About
    Home --> API
    Home --> Announcements
    Home --> Workflow
    Home --> Login
    GettingStarted --> Login
    Tutorials --> AppHome
    
    %% Authentication Flow
    Login --> Auth0
    Auth0 --> Callback
    Callback --> AppHome
    AppHome --> Logout
    
    %% App Landing to Main Areas
    AppHome --> ProjectList
    AppHome --> RecentActivity
    AppHome --> NewProject
    AppHome --> ManageProfile
    AppHome --> ImportResource
    AppHome --> LinkAccount
    
    %% Project Views to Detail
    ProjectList --> ProjectDetail
    RecentActivity --> ProjectDetail
    RecentActivity --> Transcribe
    
    %% Project Detail to Role-Based Actions
    ProjectDetail --> Management
    ProjectDetail --> Transcribe
    ProjectDetail --> ExportLinks
    
    %% Management Flows
    Management --> ManageUsers
    Management --> PageLayers
    Management --> ProjectConfig
    Management --> ProjectOptions
    Management --> EditDesc
    
    %% Configuration to Workflow
    ProjectConfig --> DefineLines
    DefineLines --> Transcribe
    ProjectOptions --> Annotate
    
    %% Core Transcription Flow
    Transcribe --> Annotate
    
    %% Data Flow to External Services
    Annotate -.-> RERUM
    Transcribe -.-> RERUM
    ExportLinks -.-> RERUM
    ImportResource -.-> IIIF
    ProjectConfig -.-> IIIF
    RERUM -.-> WebAnnotation
    
    %% Cross-references
    API --> RERUM
    Workflow --> AppHome
    
    %% Styling
    classDef docStyle fill:#e1f5ff,stroke:#0077b6,stroke-width:2px
    classDef authStyle fill:#fff4e6,stroke:#fd7e14,stroke-width:2px
    classDef appStyle fill:#d4edda,stroke:#28a745,stroke-width:2px
    classDef extStyle fill:#f8d7da,stroke:#dc3545,stroke-width:2px
    
    class Home,GettingStarted,Tutorials,About,API,Workflow,Announcements,Roadmap,Beta docStyle
    class Login,Logout,Callback,Auth0 authStyle
    class AppHome,ProjectList,RecentActivity,ProjectDetail,Management,ManageUsers,PageLayers,ProjectConfig,ProjectOptions,EditDesc,Transcribe,DefineLines,Annotate,NewProject,ImportResource,ExportLinks,ManageProfile,LinkAccount appStyle
    class RERUM,IIIF,WebAnnotation extStyle
```

**Navigation Overview:**

- **Documentation Site (t-pen.org)**: Public-facing information, tutorials, and getting started guides
- **Authentication Layer**: User sign-up/login via Auth0 integration
- **Application Interface (app.t-pen.org)**: Core transcription and project management features
- **External Services**: Integration with RERUM (Linked Open Data repository), IIIF image services, and Web Annotation standards

**Key Navigation Paths:**

1. **New User Journey**: Home → Getting Started → Login → App Landing → Create New Project → Transcription
2. **Returning User**: Login → App Landing → Recent Activity → Continue Transcribing
3. **Project Leader**: App Landing → Project Management → Configure → Manage Users → Set Roles
4. **Data Export**: Transcription → Annotations → Export to RERUM

> **Note:** Solid lines indicate direct navigation paths, dotted lines indicate data flow to external services.

---

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
    Management([Project Management])
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
