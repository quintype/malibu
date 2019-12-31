---
title: Jan 2019 - Minifying CSS class names
parent: Upgrading from Earlier Versions of Malibu
grand_parent: Malibu Tutorial
nav_order: 02
nav_exclude: true
---

# {{page.title}}

*This tutorial was contributed by [Tejas Dinkar](https://twitter.com/tdinkar)*

In Jan 2019, support for minifying CSS class names was added to malibu. Minifying CSS class names reduces the size of css by ~30-40%. However, it also removes valuable debugging information. This guide describes how to implement CSS class minification, as well as how to roll it back if you need to debug.

## Rationale

CSS class names are a large part of the final generated CSS file. By default, `react-module-css` generates class names that look something like this `story-card-m__story-card-headline__abcde`, which is the CSS module, the name, and a hash. However, the hash should be sufficiently unique for all practical use cases.

## Steps to implement

* First Ensure that *@quintype/build* is at the latest version

* Add the following to *Dockerfile* (on the line below `RUN npm install --no-optional`)
```docker
ENV MINIFY_CSS_CLASSNAMES true
```

## Rolling back for debugging purposes

Remove the following line from your dockerfile
```docker
ENV MINIFY_CSS_CLASSNAMES true
```
