---
layout: default
title: TPEN
permalink: /
modules: [/assets/js/isKnown.js]
---
{: .notice}
> TPEN3 is now in early access! [Learn what's new]({{site.url}}/announcements/2025/11/24/whats-new-tpen3.html) and
> [sign up today](./login?returnTo={{site.url}}/announcements/2025/11/24/whats-new-tpen3.html) to start transcribing with the latest features.

## Transcription for Paleographical and Editorial Notation

{: .unauthenticated}
[Sign Up](./login?returnTo={{site.url}}/announcements/2025/11/24/whats-new-tpen3.html){: .button role="button"}
Open an account to start recording annotations on images from all over the world and across time.

> Privacy first: read the [TPEN3 Privacy Statement]({{site.url}}/privacy/) for details on data use, local storage, and your rights. TPEN is intended for adult
> human users. We do not sell or rent any data and implement no tracking or analytics.
{: .aside}

{: .authenticated.hidden}
Welcome back! [Launch TPEN 3.0](https://app.t-pen.org){: .button role="button"}

---
{% assign pinned_posts = site.posts | where_exp: "p", "p.pinned == true" %}
{% assign recent_posts = site.posts | where_exp: "p", "p.date >= site.time | date: '%s' | minus: 604800 | date: '%Y-%m-%d'" %}
{% assign posts_to_show = pinned_posts | concat: recent_posts | uniq %}

<ul class="post-list">
  {% for post in posts_to_show %}
    <li class="post-list-item">
      <h3>
        <a href="{{ post.url | absolute_url }}">{{ post.title }}</a>
        <small>({{ post.date | date_to_long_string: "ordinal" }}) <cite>{{ post.author }}</cite></small>
      </h3>
      {% if post.coverImage %}
        <img src="{{ post.coverImage }}" alt="{{ post.title }}" class="post-cover-image">
      {% endif %}
      <p>{{ post.excerpt | strip_html }}</p>
    </li>
  {% endfor %}
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
Open your account to get started: [Sign Up](./login?returnTo={{site.url}}/announcements/2025/11/24/whats-new-tpen3.html){: .button role="button"}

{: .authenticated.hidden}
Welcome back! Ready to continue your work?

[Launch TPEN 3 →](https://app.t-pen.org){: .button role="button"}
[Getting Started Guide →]({{site.url}}/getting-started)
[View Tutorials →]({{site.url}}/category/tutorials)

{: .project-list.authenticated.hidden.gridly}
Your projects

---

## Helpful Patterns & API

For the most up-to-date and complete API documentation, see the [TPEN-services API Reference](https://github.com/CenterForDigitalHumanities/TPEN-services/blob/main/API.md).

Here are some common patterns and endpoints you can use:

### Start a New Project from an Image

```
https://api.t-pen.org/project?new=https://example.com/image.jpg
```

Start a new transcription project from any public image URL. This link can be embedded in your own repository or website to enable direct transcription.

### Get a Project's IIIF Manifest

```
https://api.t-pen.org/manifest/{project_id}
```

Retrieve the IIIF Manifest for your project to load it in external viewers or tools.

### Share a Project in Read-Only Mode

```
https://api.t-pen.org/project/{project_id}?view=html
```

Share your project with others in a read-only web viewer.

### API Authentication & Tokens

See the [API Reference](https://github.com/CenterForDigitalHumanities/TPEN-services/blob/main/API.md#authentication) for details on obtaining and using tokens for authenticated endpoints.

---

![old TPEN logo]({{site.baseurl}}assets/img/tpen_clearShadowSmall.png)
This tool is the evolution of the 21st century transcription platform at [t‑pen.org](https://t-pen.org).
Originally targeting Medieval manuscripts, users have fostered a community of carefully
transcribed images of scripts, engravings, and calligraphy from all over the world across time.
