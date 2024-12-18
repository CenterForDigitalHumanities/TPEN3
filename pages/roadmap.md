---
layout: default
title: Roadmap
permalink: /roadmap/
---

## Expected Development Timeline

The funding period for TPEN 3.0 is from 2024-2026. The development will take place in three phases:

1. **Phase 1: 2024**
    - **New platform design**
    - **Project creation and management**
    - **Interfaces and Workflows**
2. **Phase 2: July 2025**
    - **Public Beta**
    - **User feedback and improvements**
    - **Test cases and focused features**
3. **Phase 3: March 2026**
    - **Training and documentation**
    - **Migration from TPEN 2.8**
    - **Community Demonstrations and Feedback**
    - **Launch of TPEN 3.0 (December 2026)**

## Phase 1: 2024

---

> *1. Evaluate and select a technology stack for data management and user interface.*

The team considered several options, focusing on familiarity, scalability, and longevity. There is a strong
preference for open-source technologies and a commitment to standards compliance. Where possible, the team will
reduced dependencies on libraries and frameworks that would require ongoing maintenance.

### TPEN Services

The API backbone of the TPEN platform includes the required configuration and account data, as well as the
ability to create, edit, and delete projects. The API will be designed to be as flexible as possible, allowing
for the proliferation or integration of third-party tools and services.

Private user account information and project configurations will be stored in a private MongoDB database managed
on premises. User authentication is handled by Auth0 and and an idToken recovery service allows external applications 
to authenticate users with TPEN without a backend server.

The [TPEN API](/api#content) is available for any developer to use with the idToken granting access to appropriate user
actions. The API services run on a Node.js server and are available for use with any client-side application. Code is
developed in the open and contributions are welcome at the [TPEN GitHub repository](https://github.com/CenterForDigitalHumanities/TPEN-services).

### TPEN Interfaces

The user interface for TPEN 3.0 is intended to be as simple and modular as possible. For all core interfaces, we
will use ES6 JavaScript with Web Components instead of a framework like React or Angular. This will allow for
more durability and flexibility in the long term. Contributions from the community do not have to be so rigorously
controlled and the TPEN 3 experience will differ from TPEN 2 in that it will encourage a diversity of tools
built for the specific projects and workflows of the users.

The [GitHub repository](https://github.com/CenterForDigitalHumanities/TPEN-interfaces) for the TPEN interfaces is
used directly for core components and as a template for new projects. In support of developers, there is a
[well-documented set of Interface Classes](https://inurface.t-pen.org/classes/) that can be used to build new
components and interfaces. As a guiding principle, the interface modules are designed to be as simple, unstyled, and
unopinionated as possible. As most of the content is available without authentication, it should be easy to
design an interface for exhibiting project data in a variety of ways, with authentication only required for editing.

---

> *2. Enable the creation and management of projects built from IIIF standard resources.*

### IIIF Manifests
