---
title: "What's New in TPEN 3"
excerpt: "Discover the major improvements and new features in TPEN 3 compared to TPEN 2.8, from enhanced collaboration to modern standards support"
date: "2025-11-24"
categories: 
  - "announcements"
coverImage: "/assets/img/logo_feat.png"
author: "Patrick Cuba"
tldr: |
  **Key Improvements:**
  - 🌐 **Open Standards** - Full IIIF & Web Annotation support, instant Linked Open Data
  - 👥 **Team Collaboration** - Role-based access (Owner/Leader/Contributor/Viewer) with custom permissions
  - 🖥️ **Multiple Interfaces** - Classic, Complex Layout, and Unconventional interfaces + public API for custom tools
  - 📁 **Flexible Projects** - Import from TPEN 2.8, single images, IIIF Collections/Manifests
  - 📊 **Advanced Organization** - Multiple layers, groups, text flow, fragment selection
  - 🔐 **Modern Auth** - Auth0 with social login, passwordless options, enhanced security
  - ⚡ **Better Performance** - Microservices architecture, API-first design, continuous deployment
  - 🔄 **Smooth Migration** - One-click TPEN 2.8 upgrade, no forced migration
  - [🔗 Get to Work!](https://app.t-pen.org)
---

## Welcome to TPEN 3: A New Era for Digital Transcription

As we prepare for early access launch, we're excited to share the sweeping improvements that make TPEN 3.0 a valuable successor to TPEN 2.8. Built on modern web standards and informed by years of user feedback, TPEN 3 represents a complete transformation of the transcription platform while preserving everything you loved about the original.

---

## Built on Open Standards

### True Linked Open Data

TPEN 3 fully embraces **IIIF** (International Image Interoperability Framework) and **Web Annotation** standards. Your work is instantly available to the broad stable of tools and platforms within TPEN and from the global community of scholarship. Every transcription you create is:

- Stored as standard Web Annotations in the public [RERUM repository](https://rerum.io)
- Immediately accessible as Linked Open Usable Data (LOUD)
- Compatible with any IIIF-compliant viewer or tool
- Discoverable and reusable across the scholarly graph

**TPEN 2.8** generated compatible formats for external use and created redundant containers.
 
**TPEN 3** annotations are ready to use anywhere, immediately, directly targeting the original resources.

---

## Enhanced Collaboration & User Management

### Flexible Role-Based Access

TPEN 3 introduces a sophisticated permissions system with clearly defined roles:

- **Owner** - Full project control and ownership transfer
- **Leader** - Project management and team coordination  
- **Contributor** - Add and modify transcriptions
- **Viewer** - Read-only access to project content

**Custom roles** can be created with granular permissions, enabling you to design the perfect workflow for your team.

**TPEN 2.8** had limited collaboration features and basic user roles.

**TPEN 3** puts team coordination and customization at the forefront.

### Real-Time Team Coordination

- Easily add and remove team members
- Define custom permissions for specialized workflows
- Track contributor activity and attribution
- Integrate TPEN 2.8 account linking for existing users

---

## Multiple Transcription Interfaces

### Choose Your Workflow

TPEN 3 is designed to support **multiple distinct transcription interfaces**, each optimized for different needs:

1. **Classic Interface** - Familiar TPEN 2.8 style with enhanced grouping and ordering features available first, streamlined for efficiency
2. **Complex Layout Interface** - Purpose-built for challenging texts with interlinear glosses, marginal notes, and several layers of content
3. **Unconventional Interface** - Non-rectangular text regions, freeform annotations, and flexible layouts for unique manuscript types

**TPEN 2.8** offered a single interface. 

**TPEN 3** adapts to your manuscript's complexity and your preferred working style without breaking the data.

### Build Your Own Interface

With TPEN 3's **public API**, third parties and individual researchers can create custom transcription interfaces tailored to:

- Specialized manuscript types
- Collection-specific needs
- Crowd-sourced or machine-generated annotation workflows
- Proof-reading and validation tasks

---

## Flexible Project Creation

### Start from Anywhere

TPEN 3 plans support for multiple project creation methods:

***Early Access Features:***

- **TPEN 2.8 Import** - Seamlessly upgrade existing projects
- **Single Image** - Drag and drop any web-accessible image
- **IIIF Collections** - Pull in entire digital collections
- **IIIF Manifests** - Automatically import structure and metadata from any IIIF resource

***Planned Workflows:***

- **Manifest Editor** - Create and modify IIIF Manifests within TPEN 3 and then transcribe them
- **Image Collections** - Upload multiple images with custom organization
- **Lacuna Pages** - Add placeholder pages for missing folios

***Possible Extensions:***

- **Repository Integrations** - Direct connections to popular IIIF repositories (e.g., Internet Archive, Digital Bodleian)
- **Cloud Storage Links** - Import images from Google Drive, Dropbox, etc.
- **Local File Access** - Annotate images directly from your computer

**TPEN 2.8** required more manual setup and the automatic links into existing repositories continued to degrade.

**TPEN 3** seeks to remark durably upon any open resource in place.

---

## Advanced Project Organization

### Layers and Groups

TPEN 3 introduces new organizational features:

- **Multiple Layers** - Separate main text, glosses, commentary, and corrections
- **Page and Columns** - Organize related text blocks and manage complex document structures
- **Text Flow** - Define reading order within and across non-sequential pages
- **Fragment Selection** - Precise boundary definition for text regions

### Metadata, Tools, and Options Support

- Custom descriptive fields
- License and rights statements
- Publication controls
- Configure external tools and integrations
- Reuse TPEN tools in external applications

---

## Project Management Tools

### Comprehensive Configuration

TPEN 3 provides leaders with powerful project management capabilities:

- **Project Configuration** - Define lines, set transcription rules, configure tools
- **Project Options** - Enable specialized annotation types and features
- **Export Links** - Generate shareable exports in multiple formats
- **Version Control** - Track changes and manage project evolution
- **Interface Selection** - Choose default interfaces for your team

**TPEN 2.8** had configuration options limited by its own interfaces.

**TPEN 3** gives you complete control.

### Standards-Based Export

All TPEN 3 projects can be exported as:

- **IIIF Manifests** - Share with any IIIF-compatible platform
- **Web Annotations** - Standard JSON-LD format
- **Plain Text** - Textual transcription output

Other structures are easily shimmed, as needs arise. As an open source project, we encourage community contributions to expand export options.

---

## Modern Authentication

### Secure & Flexible Login

TPEN 3 uses **Auth0** through the RERUM service, supporting:

- Social login (Google, GitHub, etc.)
- Passwordless authentication options
- SMS verification
- Enhanced security and privacy

Your **public User Agent** in RERUM maintains attribution while protecting personal information. External applications can request ID tokens for integration with the TPEN 3 API.

---

## Performance & Reliability

### Modern Architecture

Built from the ground up with:

- **Microservices architecture** - Reliable, scalable, maintainable
- **Modern web technologies** - Fast, responsive interfaces
- **API-first design** - Extensible and integrable
- **Continuous deployment** - Regular updates and improvements

In addition to simpler maintenance, TPEN 3's architecture allows for modular upgrades as technologies evolve. No longer are developers required to host TPEN whole-cloth or contribute to the public codebase to customize the experience for a project - any step in the workflow can be replaced with a customized service or interface without disrupting the entire system.

---

## Smooth Migration from TPEN 2.8

### Your Work is Safe

- **One-click upgrade** forks from existing t-pen.org projects
- **Account linking** to preserve your identity and projects
- **TPEN 2.8 remains available** - no forced migration
- **Comprehensive migration documentation** (coming soon)

---

## What This Means for You

- **Researchers** - Work with any IIIF repository, collaborate seamlessly with distributed teams, and publish as Linked Open Data
- **Hosting Institutions** - Enable direct, non-destructive transcription of your collections without special infrastructure or additional development
- **Developers** - Build custom integrations using standard formats and extend any component through the public API without rebuilding the entire platform

---

## Early Access

We're launching early access with these core features and will continue to evolve based on community feedback. TPEN 3 is developed openly on [GitHub](https://github.com/CenterForDigitalHumanities/TPEN3), and we welcome your input.

**Ready to get started?** [Create your account]({{site.url}}/login) and begin transcribing today!

**Have questions?** Start the conversation in our [community discussions](https://github.com/CenterForDigitalHumanities/TPEN3/discussions) or use the feedback form within the application.
![feedback tool](/assets/img/feedback-tool.png)

---

## Thank You

This major upgrade started under the generous support of the [National Endowment for the Humanities](https://www.neh.gov/) and continues through the Research Computing Group at [Saint Louis University](https://www.slu.edu/), an R1 institution. The dedicated TPEN community has provided invaluable feedback, and the broader IIIF and W3C communities continue to push for open, accessible digital scholarship.

Encoding scholarly conversation around the artifacts of human knowledge is not a task we take on lightly or alone. Welcome to TPEN 3! 🎉
