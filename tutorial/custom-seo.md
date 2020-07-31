---
title: Custom SEO
parent: Malibu Tutorial
nav_order: 06
has_children: true
---

# {{page.title}}

<ul>
  {% assign tutorials = site.pages | where: "parent", "Custom SEO" | sort: "nav_order" %}
  {% for page in tutorials %}
    <li><a href="{{ page.url | absolute_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>