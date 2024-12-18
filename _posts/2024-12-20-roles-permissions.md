---
layout: post
title: "Roles and Permissions"
excerpt: "Understand the different roles and permissions available on the TPEN3 platform"
date: "2024-12-20"
categories: 
  - "tutorials"
  - "management"
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

| Action | Scope | Entity |
| --- | --- | --- |
| READ, UPDATE, DELETE, CREATE | METADATA, TEXT (content), ORDER, SELECTOR, DESCRIPTION | PROJECT, MEMBER, LAYER, PAGE, LINE, ROLE, PERMISSION |