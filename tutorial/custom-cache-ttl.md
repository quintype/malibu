---
title: Custom Cache TTL
parent: Advanced Topics
grand_parent: Malibu Tutorial
nav_order: 05
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Amogh](https://github.com/ags1773)_

The time for which resources are cached on CDN i.e. the s-maxage value in the Cache-Control header is set to 900 seconds for most requests. This can be changed if needed from the app level.

In the `server/app.js` [file](https://github.com/quintype/malibu/blob/master/app/server/app.js), pass an option `sMaxAge: <value>` to the `isomorphicRoutes` function like so:

```js
isomorphicRoutes(app, {
  generateRoutes: generateRoutes,
  loadData: loadData,
  seo: generateSeo,
  ...
  sMaxAge: "1800"
});
```

- This will change the s-maxage value of `/route-data.json`, story and section pages, AMP pages, `mobile-data.json`, staticRoutes and custom routes passed from app

- However it won't change the s-maxage value of some requests like service-worker, shell.html, app manifest
