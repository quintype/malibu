---
title: Prerender webpages
parent: Malibu Tutorial
nav_order: 13
---

# {{page.title}}

*This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)*

Currently, it's difficult to process JavaScript and not all search engine crawlers are able to process it successfully or immediately which leads to seo problem. so we came up with one solution called prerender.io.

The Prerender.io middleware will check each request to see if it's a request from a crawler. If it is a request from a crawler, the middleware will send a request to Prerender.io for the static HTML of that page. If not, the request will continue on to your normal server routes. The crawler never knows that you are using Prerender.io since the response always goes through your server.

If you would like to know more about it, consider reading the [Prerender.io]({{"https://prerender.io/documentation"}}) document.

## Setup prerender for your app

It's very easy to setup prereder to your app. you just need to pass prerenderServiceUrl from isomorphicRoutes *prerenderServiceUrl: "https://prerender.quintype.io/https://www.prabhatkhabar.com"*.

In *app/server/app.js*

```javascript
isomorphicRoutes(app, {
  generateRoutes: generateRoutes,
  loadData: loadData,
  pickComponent: pickComponent,
  .
  .
  .
  prerenderServiceUrl: "https://prerender.quintype.io/https://www.prabhatkhabar.com"
});
```

You may now proceed to [Deploying With Black Knight]({{"/tutorial/deploying-with-black-knight" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
