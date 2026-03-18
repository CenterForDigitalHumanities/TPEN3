---
layout: default
title: Updates
permalink: /updates/
---
<div class="rss-header" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
  <img src="/assets/img/logo.png" alt="TPEN Logo" class="rss-logo" style="height: 60px;"/>
  <span class="rss-title" style="font-size: 2rem; color: var(--primary-color);">{{ site.title }} Updates</span>
</div>
<ul class="rss-list" style="list-style: none; padding: 0;">
  {% for post in site.posts %}
    <li style="margin-bottom: 2rem; border-bottom: 1px solid var(--gray); padding-bottom: 1rem;">
      <a href="{{ post.url | relative_url }}" style="font-size:1.2rem; color: var(--link);"><strong>{{ post.title }}</strong></a>
      <div class="rss-date" style="color: var(--gray); font-size: 0.9rem;">{{ post.date | date: "%B %d, %Y" }}</div>
      <div class="rss-desc" style="margin-top: 0.5rem;">{{ post.excerpt }}</div>
    </li>
  {% endfor %}
</ul>
<p style="margin-top:2rem;"><a href="/feed.xml"><i class="bi bi-rss-fill" style="color: orange; font-size: 1.3em; vertical-align: middle;"></i> Subscribe via RSS</a></p>
