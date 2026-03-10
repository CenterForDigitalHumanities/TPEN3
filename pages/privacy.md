---
layout: default
title: Privacy Statement
description: TPEN3 Privacy Statement - how we collect, use, and protect your information.
permalink: /privacy/
---

## Version

- Version: 1.0
- Last updated: February 16, 2026
- Effective date: February 16, 2026

TPEN3 is operated by the Research Computing Group at Saint Louis University. We provide web-based tools for transcribing manuscripts and historical documents. This privacy statement explains how we collect, use, and protect your information when you use TPEN3 at **three.t-pen.org** and **app.t-pen.org**.

> We do not sell your personal information. We do not use tracking cookies or advertising.

## Table of Contents

1. [Who We Are](#1-who-we-are)
2. [Information We Collect](#2-information-we-collect)
3. [How We Use Your Information](#3-how-we-use-your-information)
4. [Information Sharing and Public Disclosure](#4-information-sharing-and-public-disclosure)
5. [Third-Party Services](#5-third-party-services)
6. [Cookies and Local Storage](#6-cookies-and-local-storage)
7. [How We Protect Your Information](#7-how-we-protect-your-information)
8. [Data Retention and Deletion](#8-data-retention-and-deletion)
9. [Your Rights Under GDPR](#9-your-rights-under-gdpr-european-users)
10. [Your Rights Under CCPA/CPRA](#10-your-rights-under-ccpacpra-california-and-us-users)
11. [Global Privacy Control (GPC)](#11-global-privacy-control-gpc)
12. [Children's Privacy](#12-childrens-privacy)
13. [Changes and Contact](#13-changes-and-contact)

## 1. Who We Are

TPEN (Transcription for Paleographical and Editorial Notation) is a web-based transcription platform developed and maintained by the **Research Computing Group** at **Saint Louis University**, St. Louis, Missouri, United States.

Our services are available at:

| Domain | Purpose |
| --- | --- |
| **three.t-pen.org** | TPEN3 home and authentication |
| **app.t-pen.org** | TPEN3 application interface |
| **api.t-pen.org** | TPEN3 services API ([documentation](https://api.t-pen.org/API.html)) |
| **static.t-pen.org** | Published project resources |

TPEN3 source code is open source under the [Apache License 2.0](https://github.com/CenterForDigitalHumanities/TPEN-interfaces/blob/main/LICENSE). Non-code content (documentation, images) is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## 2. Information We Collect

### A. Account and Authentication Data

Auth0 is the identity provider for registered RERUM services, of which TPEN is one. When you log in, a public agent IRI is created and associated with your login token. Authentication generates a JSON Web Token (JWT) that contains your user ID, agent identifier (IRI), and an expiration timestamp. TPEN does not display or share user emails through its services. No passwords/codes are stored by TPEN directly.

### B. Profile Information (Opt-In)

You may opt in to sharing the following on your public profile with other TPEN users. 

- Display name (defaults to your email handle and may be partially identifying if not changed)

None of these are required, but may be shared:

- Profile image URL
- Academic identifiers: ORCID ID, NSF ID, institutional ID
- Social links: LinkedIn, Twitter, Instagram, Facebook, GitHub, homepage URL

### C. User-Generated Content

- **Transcriptions and annotations**: Stored in RERUM (our linked open data store) and publicly accessible by design for open scholarship.
- **Feedback and bug reports**: Submitted through TPEN and posted as GitHub issues (includes your description and the page URL you submitted from).
- **Transcription drafts**: Auto-saved in your browser to prevent data loss during editing.
- **Cached resources**: Downloaded resources (images, manifest documents) and your authentication token (`idToken`) are stored in browser for performance and session continuity.

### D. Project and Collaboration Data

- Project membership and your assigned role (Owner, Leader, Contributor, or Viewer), linked to your public agent.
- Email addresses of users you invite to collaborate (stored to connect invite codes to temporary accounts until the invitee accepts).

### E. Activity Data

We track per-user metrics on the server to power features like the "continue working" panel on your dashboard. This includes which projects you recently edited and when projects were last modified.

### F. Technical Information

When your browser loads TPEN or fetches resources from third-party CDNs and external servers, the following is automatically sent by your browser as part of standard HTTP requests:

- IP address
- User-Agent string (browser type and operating system)
- Referer header

TPEN does not explicitly collect or store this information on our servers, but third-party CDN providers and external image servers may log it per their own privacy policies.

## 3. How We Use Your Information

| Purpose | Data used | Legal basis (GDPR) |
| --- | --- | --- |
| Account authentication | Email, JWT tokens | Contractual necessity |
| Attribute transcriptions to authors | Public user agent | Legitimate interest (academic attribution) |
| Project collaboration | Email, display name, roles | Contractual necessity |
| Display your public profile | Optional profile fields | Consent (you choose to provide them) |
| Show recent projects on dashboard | Activity timestamps, project IDs | Legitimate interest (user experience) |
| Import projects from TPEN 2.8 | Legacy project data, temporary cookie | Contractual necessity |

> We do not and will never sell or rent your personal information to anyone.

## 4. Information Sharing and Public Disclosure

### A. Publicly Accessible Information

- **Transcriptions and annotations** are publicly accessible via [RERUM](https://rerum.io) and attributed to your public user agent (not your email address).
- **Public profile** information you choose to provide (display name, social links) is visible at your public profile endpoint.
- **Public projects** and their metadata are visible to unauthenticated users.
- **Published resources**: When you choose to export your project, resources are published to **static.t-pen.org** (hosted on GitHub Pages). These URLs are obscure but openly available to anyone with the direct link.

### B. Shared with Project Collaborators

Members of projects you belong to can see your display name and role within that project. Email addresses are not available to the TPEN interfaces and are only used server-side for sending invitations.

### C. Feedback Submissions

When you submit feedback or a bug report through TPEN, it creates a public GitHub issue in our [TPEN-Static repository](https://github.com/CenterForDigitalHumanities/TPEN-Static). No user information is included in the report, only what you type and the page URL you submitted from.

### D. TPEN 2.8 Legacy Import

When importing projects from the legacy TPEN 2.8 system (t-pen.org), we temporarily set a cookie to authenticate with the legacy system. This cookie uses `SameSite=Strict` and `Secure` attributes (in production) and is deleted immediately after import completes. We do not share your TPEN3 account information with TPEN 2.8. The legacy system operates under its own separate policies.

### E. Legal Obligations

We may disclose information if required by law, court order, or government regulation.

## 5. Third-Party Services

### A. Authentication

**Auth0** manages login and stores your email address. Auth0 issues the JWT tokens used for authentication. See the [Auth0 Privacy Policy](https://auth0.com/privacy).

### B. Data Storage

**RERUM** (`store.rerum.io`) is our linked open data store for transcriptions and annotations. RERUM is operated by the Research Computing Group at Saint Louis University. Transcriptions stored in RERUM are publicly accessible by design to support open scholarship and are attributed to your public user agent.

### C. Email Delivery

When you invite collaborators to a project, invitation emails are sent through a mailrelay server at **Saint Louis University**. The invitee email address is only used for sending the invitation and is not stored by the mail service for any other purpose.

### D. Hosting

**GitHub Pages** hosts portions of this application as well as published project resources at **static.t-pen.org**. When you export a project, its resources are deployed to this static site and become publicly accessible. GitHub may log IP addresses and access patterns per their policy. See the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement).

### E. CDNs and External Libraries

TPEN3 is built on modular interfaces that may load libraries and frameworks served over third-party CDNs (such as jsDelivr, Cloudflare, Skypack, and unpkg). Your browser may also load fonts from [Google Fonts](https://policies.google.com/privacy). These providers may log your IP address and User-Agent string per their own privacy policies. We do not control these third-party services.

### F. External Resource Servers

When you import manifest documents or view manuscript images, your browser directly contacts the external servers hosting those resources (museums, libraries, archives). These servers may log your IP address and browser metadata per their own privacy policies. TPEN does not control these third-party services.

## 6. Cookies and Local Storage

### A. Cookies

TPEN uses **one cookie**, and only during a specific operation:

| Name | Purpose | Duration | Attributes |
| --- | --- | --- | --- |
| `userToken` | Authenticate with legacy TPEN 2.8 during project import | Deleted immediately after import completes | `SameSite=Strict`, `Secure` (production), `path=/`, `domain=t-pen.org` |

This cookie is strictly necessary for the import feature to function and does not require consent under GDPR Article 6(1)(b) and the ePrivacy Directive.

> We do not use tracking cookies, advertising cookies, or third-party analytics cookies.

### B. Browser Local Storage

TPEN uses your browser localStorage for core functionality:

| Key | Purpose | Duration |
| --- | --- | --- |
| `userToken` | Your JWT authentication token for staying logged in | Until logout or token expiration |
| `tpen-drafts:{projectID}:{pageID}` | Auto-saved transcription drafts to prevent data loss | Until you save the transcription or clear browser storage |
| `vault:{type}:{id}` | Cached resources (canvases, annotation pages) for faster page loads | Until browser storage is cleared |
| `tpen_redirected` | Prevents repeated login redirects | Until browser storage is cleared |
| `annotationsState` | Preserves column selection during multi-step editing | Cleared on completion or cancellation |

### C. What Happens When You Log Out

When you log out, your authentication token is removed from localStorage. Cached resources and transcription drafts may remain in local storage until you clear them manually or browser storage is cleared.

## 7. How We Protect Your Information

- **Encrypted transmission**: All data is transmitted over HTTPS (TLS).
- **Token-based authentication**: JWT tokens with automatic expiration.
- **Role-based access control**: Project access limited to assigned roles (Owner, Leader, Contributor, Viewer).
- **Open-source codebase**: Publicly auditable code allows community security review.
- **Token cleanup**: Authentication tokens are removed from browser history after login to reduce accidental sharing.

No security system is perfect. While we implement industry-standard protections, we cannot guarantee absolute security. You are responsible for keeping your login credentials confidential and logging out on shared computers. If you beleive you 
have discovered a security vulnerability, please submit a ticket at [https://github.com/CenterForDigitalHumanities/TPEN3/issues](https://github.com/CenterForDigitalHumanities/TPEN3/issues) or contact us at [research.computing@slu.edu](mailto:research.computing@slu.edu).

In the event of a data breach affecting your personal information, we will make reasonable efforts to notify affected users and relevant authorities in accordance with GDPR and applicable US state regulations.

## 8. Data Retention and Deletion

### A. Account Data

Your account data (email, profile information) is retained while your account is active. Authentication tokens expire automatically.

### B. Transcriptions and Annotations

Transcriptions and annotations are stored permanently in RERUM as public linked open data. This is by design to support long-term preservation, scholarly citation, and open access. Transcriptions are attributed to your public user agent rather than personal information like email addresses. Under GDPR Article 17(3)(d), the right to erasure does not apply where processing is necessary for archiving purposes in the public interest or scientific research.

### C. Local Storage

Your authentication token is removed from browser storage when you log out. Cached resources and transcription drafts may persist until cleared manually or by your browser. Orphaned transcription drafts for lines that no longer exist are automatically cleaned up when you next visit the page.

### D. Account Deletion

To request account deletion, contact [research.computing@slu.edu](mailto:research.computing@slu.edu). We can delete or anonymize your account while preserving the scholarly integrity of transcriptions attributed to your agent identifier. We will respond within 30 days.

## 9. Your Rights Under GDPR (European Users)

If you are in the European Union, European Economic Area, or United Kingdom, you have the following rights under the General Data Protection Regulation:

- **Right of access** (Article 15): Request a copy of the personal data we hold about you.
- **Right to rectification** (Article 16): Correct inaccurate personal data through your profile settings or by contacting us.
- **Right to erasure** (Article 17): Request deletion of your personal data, subject to the scholarly archiving exception in Article 17(3)(d) for transcriptions stored in RERUM.
- **Right to data portability** (Article 20): Request your personal data in a machine-readable format.
- **Right to withdraw consent** (Article 7(3)): Where processing is based on consent (such as optional profile information), you can withdraw consent at any time by removing the information.
- **Right to object** (Article 21): Object to processing based on legitimate interests.
- **Right to lodge a complaint**: File a complaint with your national data protection authority if you believe your rights have been violated.

TPEN does not use automated decision-making or profiling that produces legal or similarly significant effects.

To exercise your rights, contact [research.computing@slu.edu](mailto:research.computing@slu.edu) with "GDPR Request" in the subject line. We will respond within 30 days.

## 10. Your Rights Under CCPA/CPRA (California and US Users)

If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):

- **Right to know**: Request disclosure of what personal information we collect, the sources, purposes, and third parties with whom we share it.
- **Right to delete**: Request deletion of your personal information, subject to exceptions for scholarly research integrity.
- **Right to correct**: Public profile information is editable by you through your profile settings.
- **Right to opt out of sale or sharing**: TPEN does **not sell** your personal information and does not share personal information for cross-context behavioral advertising.
- **Right to non-discrimination**: We will not deny services, charge different prices, or provide different quality of service because you exercised your CCPA rights.

You may designate an authorized agent to make requests on your behalf. We may require verification of the agent's authority.

To exercise your rights, contact [research.computing@slu.edu](mailto:research.computing@slu.edu) with "CCPA Request" in the subject line. We will verify your identity and respond within 45 days (which may be extended by an additional 45 days with notice).

## 11. Global Privacy Control (GPC)

[Global Privacy Control](https://globalprivacycontrol.org/) (GPC) is a browser-level signal that communicates your privacy preferences to websites. GPC is legally recognized under California law and other jurisdictions.

**We honor GPC signals.** Currently, TPEN does not use analytics or tracking technologies that would be affected by GPC. If we add such technologies in the future, GPC signals will automatically opt you out.

You can enable GPC in browsers that support it, including Brave, Firefox (with Privacy Badger), DuckDuckGo, and others. Visit [globalprivacycontrol.org](https://globalprivacycontrol.org/#browsers) for a full list.

## 12. Children's Privacy

TPEN is a scholarly transcription tool not specifically designed for children. We do not knowingly collect personal information from children under 13 without verifiable parental consent. If you believe a child under 13 has provided us with personal information, please contact [research.computing@slu.edu](mailto:research.computing@slu.edu) and we will take steps to delete that information.

## 13. Changes and Contact

### A. Updates to This Statement

We may update this privacy statement to reflect changes in our practices or legal requirements. For material changes affecting your rights, we will provide notice on the TPEN homepage. Non-material changes (clarifications, formatting) will be reflected in the "Last updated" date above.

### B. Version History

- **Version 1.0** (February 16, 2026): Initial privacy statement.

### C. Contact Us

For privacy questions, data requests, or concerns:

**Research Computing Group**  
Saint Louis University  
St. Louis, Missouri, United States  
Email: [research.computing@slu.edu](mailto:research.computing@slu.edu)

When contacting us about privacy matters, please include "Privacy", "GDPR Request", or "CCPA Request" in the subject line so we can route your inquiry appropriately.

### D. Additional Resources

- [TPEN3 Home](https://three.t-pen.org)
- [Center for Digital Humanities (GitHub)](https://github.com/CenterForDigitalHumanities)
- [Global Privacy Control](https://globalprivacycontrol.org/)
