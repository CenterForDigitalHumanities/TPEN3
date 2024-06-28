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

```html
  https://example.org/transcription.html?projectID=1a2b3c4d5e6f&page=9a8f7d6c4b
```

## Data Objects

The most typical transcription interface may require access to several classes and granularities of data objects to populate the modules on the page.

* User - the authorized user who has permission to view or modify the transcription data
* Project - the top-level object containing the configuration and permissions settings
* Manifest - the "content" that presented by an external repository
* Layers - the set of Annotation Collections that organize the TPEN contributions
* Pages - the at-least-one-per-page sets of Annotation Pages that attach text to a region of a page Canvas

### User

The [TPEN authentication system](#new) will allow a user to log into this interface and provide the `authorization` token required for any modifications using the TPEN services. The `tpen-authorized` event, triggered on login, provides a User that includes at least these values:

```json
{
    "http://store.rerum.io/agent": "http://store.rerum.io/v1/id/60b15c64ed01e9941",
    "http://rerum.io/app_flag": [ "tpen" ],
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

TPEN will always include a `projectID` parameter in the query string of a referral to a transcription interface. This ID matches the hexadecimal identifier of the Project in the TPEN database. Although it is possible to load only a single page and annotate it, the Project is the source of permissions and configuration settings. The complete interface object for a Project can be accessed openly at the `/project/{id}` service.

```html
  https://api.t-pen.org/project/88b15c63bc41e9697
```

```json
{
  "_id": "88b15c63bc41e9697",
  "title": "Manuscript Project",
  "created": "2024-06-27T20:53:23.310Z",
  "license": "CC-BY",
  "tags": [],
  "creator": "https://store.rerum.io/v1/id/60b15c64ed01e9941",
  "layers": [ "a5715c64ed0165c22" ],
  "lastModified": "https://example.com/canvas/2",
  "viewer": "https://static.t-pen.org/88b15c63bc41e9697",
  "license": "CC-BY",
  "manifest": "https://example.com/manifest.json",
  "tools": [],
  "options": {},
  "contributors": {
    "60b15c64ed01e9941" : {
      "displayName" : "First Dude",
      "agent" : "https://store.rerum.io/v1/id/60b15c64ed01e9941",
      "roles" : [ "OWNER", "LEADER", "CONTRIBUTOR" ],
      "permissions" :  {
        "members" : "MODIFY_ALL",
        "project" : "MODIFY_ALL",
        "annotations" : "MODIFY_ALL"
      }
    },
    "bc985c64ed01eadce" : {
      "displayName" : "Another Fellow",
      "agent" : "https://store.rerum.io/v1/id/bc985c64ed01eadce",
      "roles" : [ "CONTRIBUTOR" ],
      "permissions" :  {
        "members" : "NONE",
        "project" : "MODIFY_PAGES ADD_COLLECTIONS",
        "annotations" : "MODIFY_ALL"
      }
    }
  }
}
```

For transcription purposes, this Project includes the `contributors` map which identifies who will be allowed to view and modify the page annotations. If a custom interface requires novel roles, such as a blind peer reviewer or teaching assistant, those can be defined and added to the Project customizations. The `page` parameter contains the `id` of the Annotation Page to show first. This `id` is found within one of the resolved Layers (Annotation Collection), but is not surfaced in the basic Project JSON returned.

### Manifest

The `manifest` property represents the external content of the Project, the digitized images, metadata, rights, etc. as presented by the original content holders. Interfaces should expect that resolving the `manifest` URL will return one of the following formats:

* [IIIF Manifest (Presentation 3)](https://iiif.io/api/presentation/3.0/) - The recent iteration of the International Image Interoperability Framework standard for presenting digital content. The Web Annotation standard adopted by its context is used for the Annotations created in TPEN as well. For [projects created from non-IIIF objects]({% post_url 2024-07-02-start-a-project %}), the `manifest` will be generated by TPEN for consistency. When a Project is created from a valid IIIF Manifest, the `manifest` will be a reference to the original resource, which may not be as stable. When new IIIF versions emerge, the `manifest` will be updated to reflect the latest version.
* [IIIF Manifest (Presentation 2)](https://iiif.io/api/presentation/2.1/) - The older version of the IIIF Manifest standard will not be used by TPEN, but is still used by many content providers. The Manifesto library in [IIIF Commons](https://iiif-commons.github.io/manifesto/) can be used to convert a Presentation 2 Manifest to Presentation 3.
* [IIIF Collection](https://iiif.io/api/presentation/3.0/#51-collection) - Many Projects will draw on multiple IIIF Manifests, such as a collection of books. The `manifest` property will be a reference to the Collection Manifest, which will contain references to all of the individual Manifests. A repository may provide its own Collections or TPEN will create a Collection for Projects with multiple Manifests. These types of Collections may combine Presentation 2 and 3 Manifests, TPEN-generated and external, even other Collections, together in one Collection. Although it is highly abnormal as a use of a IIIF Collection, it is a convenient way to allow users to assemble a Project from multiple sources.

*Note: When a content provider provides a resolvable URI for their Canvas resources, it is possible to present and transcribe a single "page" without ever resolving the `manifest` property. It is possible, however, for the Manifest to be the only place to dereference a Canvas resource, so the location of both will always be provided.*

### Layers

What a paleographer experiences as a "Layer" in the TPEN platform is a special Annotation Collection that organizes a path through a Project's image resources through annotation. For example, a Project with a base text and commentary glosses may have a Layer for each. The contents of the Collection are ordered Annotation Pages, representing the intended flow of the transcription annotations. Layers do not need to be completely in sync with each other - their order and coverage serve their own scopes.

### Annotation Page

Finally, we arrive at the interesting resources that make up the TPEN content, the Annotations. Each folio image in a manuscript is segmented into fragments selectors that bound the lines to be transcribed. A series of related Annotations are grouped together into an Annotation Page. While there is some room for interpretation, the intention is that Annotations together in a page can be read as continuous and related text. For example, a Project as above with separate layers for the base text and commentary glosses might have two Annotation Pages, one for each layer. If the base text is organized into two columns, an application may choose to record the two columns as separate, sequential Annotation Pages. A single Annotation Page may only contain lines from a single Canvas, though that Canvas may composite several images together.

Each Annotation Page matches standard usage very closely with the acceptable requirement of `partOf` and `target` properties.

```json
{
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "id": "https://store.rerum.io/v1/id/6e663b19d7a",
  "type": "AnnotationPage",
  "partOf": "https://store.rerum.io/v1/id/a99be311f2e3e",
  "target" : "https://example.com/canvas/1",
  "next": "https://store.rerum.io/v1/id/fe763b19bbe",
  "items": [
    {
      "id": "https://store.rerum.io/v1/id/d3763b1944c",
      "type": "Annotation",
      "body": "http://example.net/comment1",
      "target": "http://example.com/canvas/1#xywh=12,26,640,116"
    }, ...
  ]
}
```

The `partOf` property is used to indicate the layer (Annotation Collection) that the Annotation Page belongs to. The `target` property on the Annotation Page indicates the Canvas on which the lines are found even if the Annotations themselves have not been embedded in the `items` property.

The flow of a transcription depends completely on the order of the elements in the various containers. For each Layer, the `Collection.first` Annotation Page will indicate the `Page.next` until the `Collection.last` is reached. Within each `Page.items` the Annotations are also in order.

## Modifying Resources

While the manuscript content belongs to an external resource, there are some ways to non-destructively modify the appearance. If the size or layout of the folio, the photography, or orientation makes straightforward transcription challenging, there are some options that may be considered.

* **CSS Filters and Transforms** can be described through standard rules that are easy to apply in a browser presentation and do not change the underlying resources. The options might be controlled by a user with sliders and toggles to dial in the best view for each photograph. Simple cases can balance colors, saturation, and contrast to make the lettering easier to discern. In complex cases, sharpening masks or perspective skewing could be applied.
* **Canvas Cropping** prefers to set a viewbox around the Annotation Page instead of the full Canvas. To make this work, a simple `#xywh=` suffix on the `target` can set a bounding box for the region, but precise bounding can be accomplished with Fragment Selector resources, if needed.
* **Canvas Rotation** can be accomplished is several ways, if the source repository hasn't already handled it. However the interface expects 
