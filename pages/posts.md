---
layout: default
title: Updates
permalink: /updates/
---

{% for category in site.categories %}
## {{ category[0] | capitalize }}
    {% for post in category[1] %}
* [{{ post.title }}]({{ post.url }}) <small markdown=1>({{ post.date | date_to_long_string: "ordinal" }}) *{{ post.author }}*</small>{% if post.excerpt %} <br> {{ post.excerpt | strip_html }} {% endif %}
    {% endfor %}
{% endfor %}
