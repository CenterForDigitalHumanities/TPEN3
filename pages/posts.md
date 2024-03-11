---
layout: default
title: Updates
permalink: /updates/
---

{% for category in site.categories %}
## {{ category[0] | capitalize }}
    {% for post in category[1] %}
  <ul class="post-list">
    <li class="post-list-item">
      <h3>
        <a href="{{ post.id }}">{{ post.title }}
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
    {% endfor %}
  </ul>
{% endfor %}
