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
    {% if page.nav_order < 100 %}
    <li><a href="{{ page.url | absolute_url }}">Chapter {{forloop.index}} - {{ page.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

### Third Party Integrations
<ul>
  {% assign tutorials = site.pages | where: "parent", "Third Party Integrations" | sort: "nav_order" %}
  {% for page in tutorials %}
    <li><a href="{{ page.url | absolute_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>

### Upgrading from Earlier Versions of Malibu
<ul>
  {% assign tutorials = site.pages | where: "parent", "Upgrading from Earlier Versions of Malibu" | sort: "nav_order" %}
  {% for page in tutorials %}
    <li><a href="{{ page.url | absolute_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>

### Advanced Topics
<ul>
  {% assign tutorials = site.pages | where: "parent", "Advanced Topics" | sort: "nav_order" %}
  {% for page in tutorials %}
    <li><a href="{{ page.url | absolute_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>

### Topics under construction

Check back soon for the following topics
* Implementing a paywall with AccessType
* Integrating with analytics (Google Analytics and QT Analytics are already integrated by default)
* Customising the header
