---
layout: post
title: "Roles and Permissions"
excerpt: "Understand the different roles and permissions available on the TPEN3 platform"
date: "2024-12-12"
categories: "documentation"
coverImage: '/assets/img/tpenUsers.png'
author: "Patrick Cuba"
tldr: |
  **Core Roles:**
  
  | Role | Capabilities |
  |------|-------------|
  | **Owner** | Full control, assign roles, delete project, transfer ownership |
  | **Leader** | Manage project, assign roles (except Owner), coordinate team |
  | **Contributor** | Add/modify annotations and pages (no config access) |
  | **Viewer** | Read-only access to project content |
  
  **Custom Roles:** Leaders can create roles with granular permissions using format: `Action_Scope_Entity` (e.g., `CREATE_METADATA_PROJECT`, `UPDATE_TEXT_LINE`)
---

## Roles and Permissions

A TPEN User may have any number of roles in a Project. These roles are initially assigned by the
creator of the Project, but can be changed at any time. TPEN recognizes these core roles:

### Owner

The Owner of a Project is the User who created it. The Owner has full control over the Project and
can assign any other User to any role. The Owner can also delete the Project. Each Project has only
one Owner, though the Owner can transfer ownership to another User.

### Leader

The Leader of a Project is the User who is responsible for the Project. The Leader can assign any
User to any role except Owner. Depending on the type of project, it may be appropriate for there to
be more than one Leader or none at all. By default, a new Project has the Owner as the Leader.

### Contributor

A Contributor is a User who can modify or add Annotations and Pages to a Project. Contributors have
no ability to change Project configuration or assign roles to other Users. An unlimited number of
Contributors can be assigned to a Project.

### Viewer

A Viewer is a User who can view the contents of a Project but cannot modify them. While most of the
content of a Project is open to the public, some interfaces may be restricted to Viewers.

## Permissions

Each role has a set of permissions associated with it. These permissions are designed to be as
flexible as possible, allowing for a wide range of configurations. The permissions of the core roles cannot be changed, but additional roles can be created with custom permissions.

The format of the permissions follows the pattern of `Action_Scope_Entity` as seen in the
`defaultRoles` in the Group Class of [the TPEN API](https://github.com/CenterForDigitalHumanities/TPEN-services/blob/5c2c46415d60cad2cdafabe459ba25b623731ccf/classes/Group/Group.mjs#L274C4-L279C6). The "*" character serves as a wildcard for any value. While
custom permissions can be created for use in a specific interface, the API will only recognize those from this set:

| Action  | Scope       | Entity     |
| ------- | ----------- | ---------- |
| READ    | METADATA    | PROJECT    |
| UPDATE  | TEXT (content)        | MEMBER     |
| DELETE  | ORDER       | LAYER      |
| CREATE  | SELECTOR    | PAGE       |
|         | DESCRIPTION | LINE       |
|         |             | ROLE       |
|         |             | PERMISSION |

## Custom Roles and Permissions

In addition to the core roles, a Project Leader can create custom roles with custom permissions. These roles can be used to create a more granular set of permissions for a specific Project. For example, a Project Leader may want to create a role that can only delete Layers or a role that can only rearrange Pages.

Any single string can be used to name a Role. This custom Role is 
then described with a set of permissions. If the format of Permissions is followed as described above, the API will recognize the custom Role and apply the permissions as described. It is also possible to create a Role with custom permissions, recognized only by the interface that created it. It should not be expected that any other interface will recognize these custom Roles. For example, if a `Teaching_Assistant` role is created with the permission to `CREATE_*_ASSIGNMENT`, another permission must be added to allow the TPEN API to allow a `CREATE_METADATA_PROJECT` where that data object may be stored.

Note well that the TPEN Core Roles will inevitably be more broad and generic than some Custom Roles. This means that a Project designed for a specific bespoke interface may have a different data integrity profile if loaded into another interface. In a peer review interface, for example, a `Reviewer` may not have the ability to see the creator of an Annotation, while on the vanilla TPEN interface, this information is available to all Contributors.
A Group Member with no `READ` permissions will not be considered a
member of the Group and will not be able to access the Project.
