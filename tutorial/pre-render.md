---
title: Prerender webpages
parent: Malibu Tutorial
nav_order: 13
---

# {{page.title}}

*This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)*

Currently, it's difficult to process JavaScript and not all search engine crawlers are able to process it successfully or immediately which leads to seo problem. so we came up with one solution called prerender.io.

The Prerender.io middleware will check each request to see if it's a request from a crawler. If it is a request from a crawler, the middleware will send a request to Prerender.io for the static HTML of that page. If not, the request will continue on to your normal server routes. The crawler never knows that you are using Prerender.io since the response always goes through your server.

If you would like to know more about it, consider reading the [Prerender.io]({{"https://prerender.io/documentation"}}) documentation.

## Setup prerender for your app

There are two steps you need to follow in order to setup your Prerender app

1. The first step to setup your prerender app is you need to whitelist the list of urls in Cloudflare frontend worker, for that you may [contact support](mailto:support@quintype.com) for it.

2. Once your list of urls are whitelisted in Cloudflare frontend worker then you just need to pass prerenderServiceUrl in isomorphicRoutes from your app. 

In *app/server/app.js*

```javascript
isomorphicRoutes(app, {
  generateRoutes: generateRoutes,
  loadData: loadData,
  pickComponent: pickComponent,
  .
  .
  .
  prerenderServiceUrl: "https://prerender.quintype.io"
});
```

You may now proceed to [Third Party Integrations]({{"/tutorial/third-party-integrations.html" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
