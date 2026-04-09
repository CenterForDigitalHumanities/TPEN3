---
title: "IIIF Manifests in TPEN 3"
excerpt: "Deep dive on how TPEN 3 uses IIIF Manifests to start projects, target images, and export reusable derivatives"
date: "2026-01-10"
categories:
  - "tutorials"
tags:
  - "iiif"
  - "manifests"
  - "standards"
author: "Patrick Cuba"
---

## Overview

TPEN 3 relies on IIIF Manifests to organize images, link annotations to original resources, and export your work for use in other tools. This guide expands on the three main ways Manifests are used.

## 1. Starting a Project from a Manifest

When you create a Project from a IIIF Manifest:

- TPEN reads the Manifest to discover all the images
- Each Canvas (image) in the Manifest becomes a Page
- The Manifest's order determines the initial Page sequence
- Metadata populates your Project description

**Example:** A medieval manuscript Manifest from the Bodleian Library might contain 200 Canvases representing 100 folios (recto and verso). TPEN imports all 200 as Pages, ready for transcription.

**Where to find Manifests:**

- Most major digital libraries (Bodleian, Gallica, Internet Archive, etc.)
- Look for "IIIF" or "Share/Export" options on manuscript viewer pages
- URLs typically end with `/manifest` or `/manifest.json`

## 2. Providing Image Targets for Annotations

TPEN doesn't copy or download images. Instead:

- Your Line annotations **target** the original images in the Manifest
- Images stay on the library's server
- Annotations point to specific x,y,w,h coordinates on each Canvas
- Anyone viewing your annotations sees the original, authoritative images

**Benefits:**

- No duplicate storage
- Images benefit from the library's infrastructure (zoom, color correction)
- Annotations remain valid even if image quality improves
- You're citing the original source, not a copy

## 3. Exporting a Derivative Manifest

You can export your complete Project as a new IIIF Manifest that includes:

- All the original image information
- Your transcription annotations embedded
- Metadata from your Project
- Reading order reflecting your Columns and Pages

**Uses for exported Manifests:**

- Share your work in IIIF viewers like Mirador or Universal Viewer
- Deposit in digital repositories
- Enable text search in image viewers
- Reuse in other scholarly tools
- Create datasets for computational analysis

**Example:** After transcribing a medieval recipe book, you export a Manifest. Researchers can now:

- View the manuscript images
- See your transcriptions overlaid on the images
- Search the full text across all pages
- Download the data for analysis
- All in standard IIIF-compatible tools

## Related Concepts

- [Canvases: Individual Image Resources](#)
- [Annotation Pages and Web Annotations](#)
- [Understanding Your Data in TPEN 3](/tutorials/2025/12/10/understanding-tpen-data.html)

## Further Reading

- [IIIF Presentation 3.0 Spec](https://iiif.io/api/presentation/3.0/)
- [Web Annotation Model](https://www.w3.org/TR/annotation-model/)
- [Mirador Viewer](https://projectmirador.org/)
- [Universal Viewer](https://universalviewer.io/)
