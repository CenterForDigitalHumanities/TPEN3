---
layout: default
title: Updates
permalink: /updates/
---
{{ site.collections | first }}
{% for collection in site.collections %}
## {{ collection.label | first}}
    {% for post in collection.posts %}
* [{{ post.title }}]({{ post.url }}){% if post.excerpt %} <br> {{ post.excerpt | strip_html }} {% endif %}
    {% endfor %}
{% endfor %}


