---
title: Isomorphic Rendering
permalink: /isomorphic-rendering
nav_order: 7
has_children: true
has_toc: false
---
# {{page.title}}

Malibu has been designed from the ground up as a [Progressive Web App](https://developers.google.com/web/progressive-web-apps), which supports isomorphic rendering.

Here is a high level overview of how a page is served from Malibu:
* The initial request is served via [Server Side Rendering]({{"/isomorphic-rendering/server-side-architecture" | absolute_url}}) of an HTML response. This page is heavily cached by our CDN, to ensure that end users get a snappy response even on old devices. For more information on how the initial page is rendered, see [Server Side Architecture]({{"/isomorphic-rendering/server-side-architecture" | absolute_url}})
* Once the page is loaded by the browser, the browser will start to hydrate components which were rendered from the server. This means that event listeners is attached, without changing the DOM that has been rendered (or at least minimal DOM updates). The process of loading relevant data and hydrating the page is described in the [Client Side Architecture]({{"/isomorphic-rendering/client-side-architecture" | absolute_url}})
* Once the page is hydrated, clicking on any [Link](https://developers.quintype.com/quintype-node-components/Link.html) will [load via AJAX]({{"/isomorphic-rendering/client-side-architecture#ajax-navigation" | absolute_url}}).
* If enabled, a *ServiceWorker* will install itself in the background of the first page load. Subsequent visits will [load from the PWA shell]({{"/isomorphic-rendering/client-side-architecture#progressive-web-app" | absolute_url}}).
