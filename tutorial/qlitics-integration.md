---
title: Qlitics Integration
parent: Third Party Integrations
grand_parent: Malibu Tutorial
nav_order: 06
---

# {{page.title}}

*This tutorial was contributed by [Shraddha Kesari](https://www.linkedin.com/in/shraddha-k-3a3548161/)*

The `qlitics.js` is a Javascript library that is used for tracking user interaction with the frontend website.

This tutorial consists of Qlitics related functions. The vast majority of these features are already wired and tracked by default (including when pages are loaded via AJAX) if you are a Malibu publisher.

## Implementation for Malibu Publishers

If you are on the Malibu Platform, you just need to add the below `<link>` tag in your `layout.ejs` file. All the wiring is already done for you.

```Javascript
 <link rel="preconnect dns-prefetch" href="https://prod-analytics.qlitics.com" crossorigin />
```

For Non-Malibu Publishers, they need to follow [this]({{"/non-malibu/qlitics-integration" | absolute_url}}) documentation in order to integrate Qlitics.
