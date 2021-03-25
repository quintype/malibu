---
title: Prerender Webpages
parent: Malibu Tutorial
nav_order: 13
---

# {{page.title}}

*This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)*

Currently, it's difficult to process JavaScript and not all search engine crawlers are able to process it successfully or immediately which leads to seo problem. so we came up with one solution called prerender.io.

The Prerender.io middleware will check each request to see if it's a request from a crawler. If it is a request from a crawler, the middleware will send a request to Prerender.io for the static HTML of that page. If not, the request will continue on to your normal server routes. The crawler never knows that you are using Prerender.io since the response always goes through your server.

If you would like to know more about it, consider reading the [Prerender.io]({{"https://prerender.io/documentation"}}) documentation.

## Setup prerender for your app

There are few steps you need to follow in order to setup your Prerender app

1. The first thing you need to update framework library  `@quintype/framework` to the latest version (`4.13.0` or greater).

2. The second step is to whitelist the list of urls in Cloudflare, for that you may [contact support](mailto:support@quintype.com) for it.

2. Once your list of urls are whitelisted in Cloudflare then you just need to pass prerenderServiceUrl in isomorphicRoutes from your app. 

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

That's it, now your webpages should serve through prerender. If you want to check your website has enabled prerender or not , put `?prerender=true` at the end of your website url (ex - https://malibu-advanced-web.qtstage.io/?prerender=true) and check it [here]({{"https://search.google.com/test/mobile-friendly"}}), you should not see any script file executing in the HTML tab.

You may now proceed to [Redirect Urls]({{"/tutorial/redirect-url.html" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
