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
export const REDIRECT_URLS = {
    "/tag/:slug": {
      destinationUrl: "/topic/:slug",
      statusCode: 302,
    },
    "/india/:someslug": {
     destinationUrl: "/news/:someslug",
     statusCode: 302,
    },
    "/bangladesh/news/210015/BNP-demands-withdrawal-of-decision-to-hike": {
     destinationUrl: "/bangladesh/bnp-demands-withdrawal-of-decision-to-hike-power-tariff",
     statusCode: 301,
   }
 }
```

or 

```javascript
function redirectUrls() {
   return  {
    "/tag/:slug": {
       destinationUrl: "/topic/:slug",
       statusCode: 302,
     },
     "/india/:someslug": {
      destinationUrl: "/news/:someslug",
      statusCode: 301,
    },
   }
 }
```
* The key is the source url to which needs to be matched.
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

You may now proceed to [Implementing Story page and Home Page Preview]({{"/tutorial/preview" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
