---
layout: default
title: TPEN
permalink: /
modules: [/assets/js/isKnown.js]
---
{: .notice}
> This site is scheduled for launch in 2026 and not intended for public use at this time.
> [Sign up as a pilot user today](./login?returnTo={{site.url}})!  Follow releases and help us drive features.

## Transcription for Paleographical and Editorial Notation

{: .unauthenticated}
[Signup](./login?returnTo={{site.url}}){: .button role="button"}
Open an account to start recording annotations on images from all over the world and across time.

{: .authenticated.hidden}
Welcome back! [Launch TPEN 3.0](https://app.t-pen.org){: .button role="button"}

---
{% assign today_date = 'now' | date: '%s' %}
{% assign pre_date = site.posts.first.date | date: '%s' %}
{% assign diff = today_date | minus: pre_date %}
{% if diff < 604800 %}
  {% assign post = site.posts.first %}
<ul class="post-list">
    <li class="post-list-item">
      <h3>
        <a href="{{ post.url | absolute_url}}">{{ post.title }}
          <small>({{ post.date | date_to_long_string: "ordinal" }})
            <cite>{{ post.author }}</cite>
          </small>
        </a>
      </h3>
      {% if post.coverImage %}
      <img src="{{ post.coverImage }}" alt="{{ post.title }}" class="post-cover-image">
      {% endif %}
      <p>
        {{ post.excerpt | strip_html }}
      </p>
    </li>
  </ul>
{% endif %}
{% for category in site.categories %}
<a href="{{ site.baseurl }}/category/{{ category[0] }}" style="text-decoration: none;"> <i class="bi bi-bookmark-fill"></i> {{ category[0] | capitalize }} ({{category[1] | size }})</a> &nbsp;
{% endfor %}

<div class="gridly">

<div>
<h3>Open</h3>

The TPEN platform remains free and open for anyone to use.
</div>
<div>
<h3>Connected</h3>

All content is Linked Open Data and the platform is designed for others to easily supplement.
</div>

<div>
<h3>Standard</h3>

Respects existing and emerging standards for text, image, and annotation.
</div>

<div>
<h3>Creative</h3>

Encourages users to share with the community and find new ways to work.
</div>

<div>
<h3> Active </h3>

Established in 2010, the project is still active and growing. 
</div>
</div>

---

## Transcribe Now

{: .unauthenticated}
Open your account to get started: [Login](./login?returnTo={{site.url}}){: .button role="button"}

{: .authenticated.hidden}
Head over to the TPEN app to work on any of your projects:

{: .project-list.hidden.gridly}
Your projects

---

## Helpful Patterns

From within your project management, you will find lots of ways to share, collaborate, or reuse your annotation data. 
Here are a few helpful patterns to get you started.

### https://services.tpen.rerum.io/project?new=https://example.com/image.jpg

Start a new transcription. This link may also be [embedded in your own repository](https://github.com/CenterForDigitalHumanities/TPEN3/issues/32) of images to enable people to start transcribing your collections.


### https://services.tpen.rerum.io/manifest/`project_id`

Discover the Manifest to load your project in an external viewer


### https://tpen.rerum.io/project/`project_id`?view=html

Share your Project in a readonly viewer

---

![old TPEN logo]({{site.baseurl}}assets/img/tpen_clearShadowSmall.png)
This tool is the evolution of the 21st century transcription platform at [t‑pen.org](https://t-pen.org).
Originally targeting Medieval manuscripts, users have fostered a community of carefully
transcribed images of scripts, engravings, and calligraphy from all over the world across time.
