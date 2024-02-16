---
layout: default
title: Updates
permalink: /updates/
---

{% for category in site.categories %}
## {{ category[0] }}
    {% for post in category[1] %}
* [{{ post.title }}]({{ post.url }}){% if post.excerpt %} <br> {{ post.excerpt | strip_html }} {% endif %}
    {% endfor %}
{% endfor %}
