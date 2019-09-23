---
title: Malibu Tutorial
nav_order: 5
has_children: true
has_toc: false
---
# {{page.title}}

<ul>
  {% assign tutorials = site.pages | where: "parent", "Malibu Tutorial" | sort: "nav_order" %}
  {% for page in tutorials %}
    <li>
      <a href="{{ page.url | absolute_url }}">Chapter {{page.nav_order}} - {{ page.title }}</a>
    </li>
  {% endfor %}
</ul>
