---
title: Prerender Webpages
parent: Malibu Tutorial
nav_order: 9
---

# {{page.title}}

_This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar) and [Amogh](https://github.com/ags1773)_

[prerender.io](https://prerender.io/) is a service that shows a simplified page without any javascript to crawlers in order to improve SEO

## Steps to enable prerender for a malibu app

1. Update `@quintype/framework` to the latest version (`4.13.0` or greater).

2. Whitelist your URLs in Cloudflare, for that, you may [contact support](mailto:support@quintype.com) for it.

3. In order to detect crawler, we use Cloudflare's URL rewrite feature to append a query parameter `prerender=true`. Get in touch with support to add your URLs to the URL rewrite rules

4. Pass parameter `prerenderServiceUrl` in isomorphicRoutes from your app. If you wish to use the default prerender service set up by Quintype, the `prerenderServiceUrl` is `https://prerender.quintype.io`. If you wish to set up your custom prerender service, pass that URL here.

In _app/server/app.js_

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

That's it, now your web pages should serve through prerender. If you want to check your website has enabled prerender or not, copy the app url(Ex: https://malibu-web.quintype.io/) and check it [here]({{"https://search.google.com/test/mobile-friendly"}}), you should not see any script file executing in the HTML tab because this tool provides the result based on Googlebot User-Agent for the smartphone.

You may now proceed to [Redirect Urls]({{"/tutorial/redirect-url.html" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
