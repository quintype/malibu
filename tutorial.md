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
    {% if page.nav_order %}
    <li>
      <a href="{{ page.url | absolute_url }}">Chapter {{page.nav_order}} - {{ page.title }}</a>
    </li>
    {% endif %}
  {% endfor %}
</ul>

{% assign wip_tutorials = site.pages | where: "nav_exclude", true | where_exp:"item", "item.path contains 'tutorial'" %}
{% assign wip_size = wip_tutorials | size %}
{% if wip_size > 0 %}
### The following tutorials are Work In Progress
<ul>
  {% for page in wip_tutorials %}
    <li>
      <a href="{{ page.url | absolute_url }}">{{ page.title }}</a>
    </li>
  {% endfor %}
</ul>
{% endif %}
