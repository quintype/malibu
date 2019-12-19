---
title: Upgrading from Earlier Versions of Malibu
nav_order: 200
has_toc: false
parent: Malibu Tutorial
---
# {{page.title}}

<ul>
  {% assign tutorials = site.pages | where: "parent", "Upgrading from Earlier Versions of Malibu" | sort: "nav_order" %}
  {% for page in tutorials %}
    {% if page.nav_order %}
    <li>
      <a href="{{ page.url | absolute_url }}">{{ page.title }}</a>
    </li>
    {% endif %}
  {% endfor %}
</ul>
