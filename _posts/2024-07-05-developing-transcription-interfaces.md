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
tldr: |
  **For Developers:**
  
  | Component | Purpose | API Endpoint |
  |-----------|---------|-------------|
  | User | Auth token & permissions | Authorization event (Bearer token) |
  | Project | Config & permissions | `/project/{id}` |
  | Manifest | IIIF images & metadata | project.manifest |
  | Layers | Annotation Collections | Ordered pages per layer |
  | Pages | Annotation Pages | Line annotations with selectors |
  
  **Update Text:** `PATCH /line/{id}/text` with Bearer token
  
  **Key Standards:** IIIF Presentation 3, Web Annotations, Linked Open Data
---

A referral to a transcription interface from TPEN will include just enough data to enable the interface to load the correct presentation and correctly apply modifications to the TPEN data services.

```html
https://app.t-pen.org/transcribe?projectID=1a2b3c4d5e6f&pageID=9a8f7d6c4b
```

## Data Objects

The most typical transcription interface may require access to several classes and granularities of data objects to populate the modules on the page.

* User - the authorized user who has permission to view or modify the transcription data
* Project - the top-level object containing the configuration and permissions settings
* Manifest - the "content" that presented by an external repository
* Layers - the set of Annotation Collections that organize the TPEN contributions
* Pages - the at-least-one-per-page sets of Annotation Pages that attach text to a region of a page Canvas

### User

The TPEN authentication integrates with RERUM/Okta (Auth0). On login, the interface dispatches an authorization event that provides the Bearer token required for API calls. The event provides a User object that includes at least these values:

```json
{
    "http://store.rerum.io/agent": "http://store.rerum.io/v1/id/60b15c64ed01e9941",
    "http://rerum.io/app_flag": [ "tpen" ],
    "nickname": "PaleoGreg",
    "name": "pgreg",
    "picture": "https://s.gravatar.com/avatar/180ee1b0cf77c.png",
    "updated_at": "2024-06-27T20:53:23.310Z",
    "iat": 1719521609,
    "exp": 1719557609,
    "authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6Ik..."
}
```

* `name` and `nickname` come from the identity provider and may differ from TPEN profile
* `app_flag` includes authorized applications (e.g., "tpen")
* `authorization` is the Bearer token used for authenticated API requests
* `exp` indicates token expiry and should be checked by clients
* `http://store.rerum.io/agent` is the URI of the user's public Agent in RERUM

While this data is technically enough to identify the user, it lacks the context of the TPEN user. The `my/profile` service, authorized with the Bearer token, will return the TPEN user:

```json
{ 
  "_id": "60b15c64ed01e9941", 
  "agent": "https://store.rerum.io/v1/id/60b15c64ed01e9941", 
  "profile": {
    "https://orchid.id" : "0000-0000-3245-1188",
    "display_name" : "PaleoGreg",
    "email" : "pgreg@example.org"
  }
}
```

The `profile` property is flexible and is only guaranteed to contain the `display_name` property, which is not required to match the `name` in the authenticated user object. Anything the user includes in this map, however, is considered public and may be displayed in the transcription interface. In specialized cases, it may be helpful to further resolve an identity from the profile or expand the RERUM Agent to include the full set of public information.


### Project

TPEN Interfaces include a `projectID` parameter in the query string. This matches the hexadecimal identifier of the Project in the TPEN Services database. Although it is possible to load only a single page and annotate it, the Project is the source of permissions and configuration settings. The complete interface object for a Project can be accessed at the `GET /project/{id}` service.

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
* [IIIF Collection](https://iiif.io/api/presentation/3.0/#51-collection) - Many Projects will draw on multiple IIIF Manifests, such as a collection of books. The `manifest` property will be a reference to the Collection, which will contain references to all of the individual Manifests. A repository may provide its own Collections or TPEN will create a Collection for Projects with multiple Manifests. These types of Collections may combine Presentation 2 and 3 Manifests, TPEN-generated and external, even other Collections, together in one Collection. Although it is highly abnormal as a use of a IIIF Collection, it is a convenient way to allow users to assemble a Project from multiple sources.

*Note: If the content provider exposes resolvable Canvas URIs, it is possible to present and transcribe a single "page" without resolving the `manifest` property. In many cases, however, the Manifest is necessary to dereference Canvas resources, so both locations are provided.*

### Layers

What a paleographer experiences as a "Layer" in the TPEN platform is a special Annotation Collection that organizes a path through a Project's image resources using the annotation structure. For example, a Project with a base text and commentary glosses may have a Layer for each. The contents of the Collection are ordered Annotation Pages, representing the intended flow of the transcription annotations. Layers do not need to be completely in sync with each other - their order and coverage serve their own scopes.

### Annotation Page

Finally, we arrive at the interesting resources that make up the TPEN content, the Annotations. Each folio image in a manuscript is segmented into fragments selectors that bound the lines to be transcribed. A series of related Annotations are grouped together into an Annotation Page. While there is some room for interpretation, the intention is that Annotations together in a Annotation Page can be read as continuous and related text. For example, a Project as above with separate layers for the base text and commentary glosses might have two Annotation Pages, one for each layer. If the base text is organized into two columns, an application may choose to record the two columns as separate, sequential Annotation Pages. A single Annotation Page may only contain lines from a single Canvas, though that Canvas may composite several images together.

Each Annotation Page matches standard usage very closely with the acceptable requirement of the `partOf` and `target` properties.

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
      "body": "",
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
* **Canvas Rotation** can be accomplished is several ways, if the source repository hasn't already handled it. The method does not matter unless compatibility with other interfaces is required. Note that the dimensions and direction of any Annotations are relative to the Canvas as it was delivered.
* **Overlapping Annotations** or derivative copies of an original resource may be used to supplement an external resource with more specific or complete information. All IIIF documents generated by TPEN are easy to identify and might be linked as updates to existing Annotation Pages, for example.

## Recording Transcription

The most regular initial state of a new Project will include a linked Manifest that has no transcription annotations of its own. In these cases, TPEN will create a new Annotation Collection and Annotation Page for each folio. On first load, these will be empty until bounded regions are added to indicate lines. If the line selection process has already completed, the query string "page" will be the active Annotation Page, its `target` will identify which Canvas these Annotations should be targeting, and the `items` array will be populated with Annotations and Fragment Selectors (or selector syntax like "#xywh=") to which the entered text should be recorded.

Users with permissions to modify text can contribute to these Annotations. TPEN Services validates permissions using the Bearer token; clients may pre-check based on Project roles. Use the Line API for text updates.

An empty line Annotation from our example above might look like this:

```json
{
  "id": "https://store.rerum.io/v1/id/d3763b1944c",
  "type": "Annotation",
  "body": "",
  "target": "http://example.com/canvas/1#xywh=12,26,640,116"
}
```

after adding the typed text, "Leve fit, quod bene fertur opus", the Annotation would look like this:

```json
{
  "id": "https://store.rerum.io/v1/id/d3763b1944c",
  "type": "Annotation",
  "body": {
    "type" : "TextualBody",
    "value" : "Leve fit, quod bene fertur opus",
    "format" : "text/plain",
    "language" : "la"
  },
  "target": "http://example.com/canvas/1#xywh=12,26,640,116"
}
```

Since only the `body` changes, PATCH the line text.

```javascript
fetch("https://api.t-pen.org/line/d3763b1944c/text", {
  method: "PATCH", 
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "type" : "TextualBody",
    "value" : "Leve fit, quod bene fertur opus",
    "format" : "text/plain",
    "language" : "la"
  })
})
```

*<small>These `type`, `format` defaults and the optional `language` can be omitted by setting the "Content-Type" header to "text/plain" and sending only the new string.</small>*

---

### API and Interfaces References

- TPEN Services OpenAPI: `https://api.t-pen.org/API.html`
- TPEN Interfaces: `https://app.t-pen.org/` (transcription and project dashboards)

Endpoints and payloads evolve; consult the Services docs for the latest contract and supported operations.

The existing version of the Annotation will continue to exist, but the TPEN API will update the Line and all related documents, returning the updated Line id to the client.
