---
title: Redirect Urls
parent: Malibu Tutorial
nav_order: 14
---

# {{page.title}}

*This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)*

In this tutorial, we will see the list of urls redirect to some different urls with status code.

## Basic Terminology

To get the redirect url feature, update @quintype/framework to the latest version (4.2.2 or greater)


The first thing as you need to setup list of redirect urls <br />

``` javascript
export const REDIRECT_URLS = [
  {
    sourceUrl: "/tag/:slug",
    destinationUrl: "/topic/:slug",
    statusCode: 302,
  },
  {
     sourceUrl: "/india/:someslug",
     destinationUrl: "/news/:someslug",
     statusCode: 302,
   },
   {
     sourceUrl: "/bangladesh/news/210015/BNP-demands-withdrawal-of-decision-to-hike",
     destinationUrl: "/bangladesh/bnp-demands-withdrawal-of-decision-to-hike-power-tariff",
     statusCode: 301,
   }
]

```

or 

```javascript

function redirectUrls() {
   return  [
     {
       sourceUrl: "/tag/:slug",
       destinationUrl: "/topic/:slug",
       statusCode: 302,
     },
     {
      sourceUrl: "/india/:someslug",
      destinationUrl: "/news/:someslug",
      statusCode: 301,
    },
   ]
}


```
* The `sourceUrl` represents the url which needs to be redirect
* The `destinationUrl` represents the url on which the sourceUrl need to be redirect
* The `statusCode` represents wether the redirection should be status code 301 (means that a new page has taken over permanently) or 302 (the page moved temporarily)

Then you need to pass `REDIRECT_URLS` to the `isomorphicRoutes` function from your app. **Note:** the 
`REDIRECT_URLS` could be a list of objects in an array or it could be a function which return list of objects in an array

Open *app/server/app.js*.

```javascript

isomorphicRoutes(app, {
  ... 
  redirectUrls: REDIRECT_URLS,
});

```

You may now proceed to [Third Party Integrations]({{"/tutorial/third-party-integrations.html" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
