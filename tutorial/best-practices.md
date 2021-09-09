---
title: Best Practices
nav_order: 29
parent: Malibu Tutorial
---

# {{page.title}}

_This tutorial was contributed by [Andukuri Venkata Phaneendra](https://www.linkedin.com/in/venkata-phaneendra-andukuri/)_

In this tutorial we will discuss some of the best practices which improve the performance

## Accessibility

### Links should have a discernible name

Link text that is discernible, unique, and focusable improves the navigation experience for users of screen readers and other assistive technologies.

Similar to buttons, links primarily get their accessible name from their text content. Avoid filler words like "Here" or "Read more"; instead, put the most meaningful text into the link itself:

```
    <a href="…">our guide to creating accessible web pages</a>
```

Learn more in https://web.dev/link-name/

### Tap Targets should be sized properly

Tap targets are the areas of a web page that users on touch devices can interact with. Buttons, links, and form elements all have tap targets.

Many search engines rank pages based on how mobile-friendly they are. Making sure tap targets are big enough and far enough apart from each other makes your page more mobile-friendly and accessible.

Any on-screen element that someone can click, touch, or otherwise interact with should be large enough for reliable interaction. Consider making sure these elements have a width and height of at least 48px

Learn more in https://web.dev/tap-targets/
