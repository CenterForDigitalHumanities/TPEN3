---
title: "Developing Transcription Interfaces"
excerpt: "A code-focused look at transcription interfaces in TPEN 3.0."
date: "2022-07-05"
categories: 
  - "tutorials"
tags:
  - "transcription"
  - "development"
coverImage: "https://github.com/CenterForDigitalHumanities/TPEN3/assets/1119165/1b4e0530-5543-4cb6-9d73-605d2076bd8c"
author: "Patrick Cuba"
---

A referral to a transcription interface from TPEN will include just enough data to enable the interface to load the correct presentation and correctly apply modifications to the TPEN data services.

`https://example.org/transcription.html?projectID=1a2b3c4d5e6f&layer=0&page=9a8f7d6c4b`

## Data Objects

The most typical transcription interface may require access to several classes and granularities of data objects to populate the modules on the page.

* User - the authorized user who has permission to view or modify the transcription data
* Project - the top-level object containing the configuration and permissions settings
* Manifest - the "content" that presented by an external repository
* Layers - the set of Annotation Collections that organize the TPEN contributions
* Annotation Pages - the at-least-one-per-page sets of Annotations that attach text to a region of a page Canvas

### User

The [TPEN authentication system](#new) will allow a user to log into this interface and provide the `authorization` token required for any modifications using the TPEN services. The `tpen-authorized` event, triggered on login, provides a User that includes at least these values:

```json
{
    "http://store.rerum.io/agent": "http://store.rerum.io/v1/id/60b15c64ed01e9941",
    "http://rerum.io/app_flag": [ ... "tpen" ],
    "nickname": "paleogreg",
    "name": "pgreg",
    "picture": "https://s.gravatar.com/avatar/180ee1b0cf77c.png",
    "updated_at": "2024-06-27T20:53:23.310Z",
    "iat": 1719521609,
    "exp": 1719557609,
    "authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6Ik..."
}
```

* `name` and `nickname` are what the user has provided to the identity service and may not be what is registered with TPEN
* `app_flag` should always contain "tpen" but may also include other authorized applications
* `authorization` is the Bearer token that will be used to authenticate any modifications
* `exp` should not represent an expired token, but may worth confirming.
* `http://store.rerum.io/agent` is the URI of the user's public Agent in the RERUM service.

While this data is technically enough to identify the user, it lacks the context of the TPEN user. The `my/profile` service, authorized with the Bearer token, will return the TPEN user:

```json
{ 
  "_id_": "60b15c64ed01e9941", 
  "agent": "http://store.rerum.io/v1/id/60b15c64ed01e9941", 
  "profile": {
    "https://orchid.id" : "0000-0000-3245-1188",
    "display_name" : "PaleoGreg",
    "email" : "pgreg@example.org"
  }
}
```

The `profile` property is flexible and is only guaranteed to contain the `display_name` property, which is not required to match the `name` in the authenticated user object. Anything the user includes in this map, however, is considered public and may be displayed in the transcription interface. In specialized cases, it may be helpful to further resolve an identity from the profile or expand the RERUM Agent to include the full set of public information.


### Project

TPEN will always include a `projectID` parameter in the query string of a refferal to a transcription interface. This ID matches the hexadecimal identifier of the Project in the TPEN database. Although it is possible to load only a single page and annotate it, the Project is the source of permissions and configuration settings.
