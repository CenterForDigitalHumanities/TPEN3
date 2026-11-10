---
title: "TPEN 3.0 Funding Reinstated"
excerpt: "The NEH restored our funding on October 13, 2026. Development resumes in January 2027 with a new roadmap and a full public launch targeted for August 2028."
date: "2026-11-10"
categories:
  - "announcements"
tags:
  - "funding"
  - "roadmap"
  - "neh"
author: "TPEN Team"
coverImage: "/assets/img/logo_feat.png"
pinned: true
tldr: |
  **🎉 The funding came back.**
  - The NEH reinstated TPEN 3.0 on October 13, 2026
  - Development resumes January 2027, after nine months paused
  - Full public launch targeted for August 2028
  - Early Access stays live the whole time, and stays free
---

In March we told you that [our federal funding had been removed]({{site.url}}/announcements/2026/03/17/early-access-announcement.html) and that we were relying on the community to help us prioritize. That was an uncomfortable thing to write, and we meant the second half of it. Today we get to post the other half of the story.

**The National Endowment for the Humanities reinstated funding for TPEN 3.0 on October 13, 2026.** Federal work on the platform stopped on April 2, 2026, seven months ago. It restarts in January 2027.

## What the pause actually cost

We are not going to pretend the schedule simply picks up where it stopped.

The original plan had a third phase beginning in March 2026: training and documentation, TPEN 2.8 migration tooling, community demonstrations, and a full public launch in December 2026. That phase was written for March 2026 and never got under way. None of it happened.

The platform itself has also been sitting. Interfaces that were marked *Coming Soon* in November 2025 are still marked *Coming Soon*. The end-to-end simplest case, which the [roadmap]({{site.url}}/roadmap/) has been honest about since 2024, is still not finished. And the development environment that our own launch checklist says has to exist before changes ship was never provisioned. Today `dev.app.t-pen.org` does not resolve. That is not a detail. It means anything we touch right now gets tested against live data in front of you.

So the restart is not a resume. We have to dig out before we build.

## The new timeline

Two phases ahead of us, each about ten months, which is roughly the size of the phases that came before:

- **Phase 3, January to October 2027. Restart and stabilization.** Bring up the development and deployment environments. Get the public record running again, which includes the monthly release notes that stopped after April. Finish the interfaces and the end-to-end workflow that earlier phases deferred.
- **Phase 4, November 2027 to August 2028. Training, migration, and launch.** This is the original Phase 3, moved intact. Comprehensive training and documentation, streamlined TPEN 2.8 migration tools, demonstrations at IIIF and SMRS, and the full public launch in August 2028.

That puts the launch twenty months later than we promised, against a gap of six and a half months between the money being pulled and the money coming back. The rest of the difference is deferred work that was already on the books before the clawback. We would rather tell you that now than discover it in a later announcement.

The [roadmap]({{site.url}}/roadmap/) carries the full plan, including the interruption band, so the page and reality line up again.

## What did not change

- **Early Access is live.** [app.t-pen.org](https://app.t-pen.org) works, and so do the API and the storage layer underneath it. Nothing was switched off during the pause.
- **It is still free.** No pricing is coming. Core services stay in service to scholars, students, and anyone else who wants to transcribe.
- **Your data is your data.** IIIF Manifests, W3C Web Annotations, and a public API. The pause did not change the architecture, which is the point of building it that way.

## What we still need from you

The priority mechanism in the roadmap runs through the Advisory Board, and there is no active board today. Phase 3 rebuilds it. Until then, [the discussions forum](https://github.com/CenterForDigitalHumanities/TPEN3/discussions) is how features get argued for. People kept transcribing through the pause, which is the reason the platform is in a state worth restarting.

If you have been waiting on a migration tool, or an interface that never arrived, or documentation that still describes the 2.8 way of doing things: say so on the discussion you care about most. Work with a clear use case in front of it gets scheduled first.

Thank you for staying. We will see you in January.

— The TPEN Team
