---
title: "Start a Project"
excerpt: "This tutorial will examine the different ways to initiate a new Project in TPEN3."
date: "2022-07-02"
categories: 
  - "tutorials"
tags: 
  - "paleography"
coverImage: "https://github.com/CenterForDigitalHumanities/TPEN3/assets/1119165/4cf83476-e73c-47ad-9fdf-90406405e5dd"
author: "Patrick Cuba"
---

## A Commentary on Knowledge

Your contributions in a TPEN3 Project are assertions - carefully defined, located, and attributed 
as Annotations. The digitized images and manuscripts are external resources enhanced by this work. 
TPEN3 puts this up front, resisting the creation of copies or disconnected commentaries. As such, 
the Project starts with a some thing to annotate.

No matter how you begin, once a Project is created you can begin to annotate the resource and collaborate 
with others, using the basic TPEN interfaces or any customized experience.

## Annotate a Digital Image

A transcription project can be started from a digital image of a manuscript folio. 
This may be any image that is available on the Internet. Dragging the image or 
pasting its URL into the Project Creation window will create a new single page Project 
based on that resource.

## Annotate a Manuscript or Collection of Images

Most transcription projects encompass a collection of images. The process for creating a Project from a collection of images is similar to the process for a single image except the Project Creation pipeline will accept a set of image resource URLs to be organized by the Project layers. Alternately, any existing Project can have the pages rearranged, added, or removed after creation. This unfortunately manual process can be made more automatic for any resources adhering to the IIIF standard (below).

## Annotate a Lacuna

A Lacuna is a region of a manuscript folio that has not been digitized. 
This is a common occurrence in the digital humanities. A page without an image will be made available as a IIIF Canvas with a generic placeholder image. This is a convenient way to fill in a transcription project where continuous text is reliably available, but it is not recommended as the only source of transcription.

## Annotate a IIIF Resource

The well-defined [International Image Interoperability Framework](https://iiif.io/) (IIIF) is a standard for the exchange of images and other resources. TPEN3 supports the creation of Projects from any IIIF resource. This automates the organization of the pages, more robustly links the images to the transcription, and provides for more advanced image options. The IIIF drag-n-drop or pasting in the URL for a Manifest or Collection will automatically generate a linked Project. This is so effective that it is recommended even if you would like to only transcribe a few pages from a longer resource.

## Import a Project from TPEN 2.8

Most existing users of t-pen.org will find it helpful to continue a legacy project on the new platform. As a major version upgrade, it is important to understand the limitations in this transition. The [Migration Guide]({{ site.baseurl }}Migration-Guide) provides a detailed description of the process.

## Digital Project Resources

Regardless of your method of creation, your User Agent will be associated with a few new digital 
records as a result:

* **TPEN Project** with you as the *Owner* and *Leader* will be created, allowing you to set any descriptive metadata, custom configurations, preferred interfaces, public access controls, and collaborators. Only you can see or modify this record.
* **IIIF Manifest** will wrap diverse resources with the [simplest version of this standard for image interchange](https://iiif.io/api/cookbook/recipe/0001-mvm-image/), allowing you to access your project in a wide array of web interfaces designed for viewing and manipulating images. This may be published by a collaborator with adequate permissions for open access.
* **Annotation Collection** is a [Web Annotation](https://www.w3.org/TR/annotation-model/#annotation-collection) document that contains the layers of your transcription. Though a common use case is a single set of lines of transcription, this allows users to accommodate the annotation of embedded figures, parallel text or commentary, overlapping transcriptions, etc. This is an obscure, but Linked Open Data record available in the [store.rerum.io](https://rerum.io) open repository.
* **Annotation Page** each column or group of lines on an image are collected in an [Annotation Page](https://www.w3.org/TR/annotation-model/#annotation-page) document. The Annotations created with this container target a specific region of your image and present as an ordered list. This is a Linked Open Data record available in the [store.rerum.io](https://rerum.io) open repository.

\**The actual image resource is only required to be accessible to your browser session. An image that is access-controlled by authentication, file security, or limited to certain network origins will be available for annotation but may not benefit from the full range of features available to most IIIF Manifests.*
