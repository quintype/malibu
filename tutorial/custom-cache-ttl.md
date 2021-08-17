---
title: Custom Cache TTL
parent: Malibu Tutorial
nav_order: 26
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Amogh](https://github.com/ags1773) and [Athira](https://www.linkedin.com/in/athira-m-r-835ab6105/)_ 

TTL is the time for which resources are cached on CDN. The value `s-maxage` is stored in a part of the response called the HTTP header, and it specifies for how many seconds, minutes, or hours content will be cached. In this tutorial, we are going to discuss how to override  `s-maxage` value in response cache-control header for `isomorphicRoutes` and `upstreamQuintypeRoutes`.  

#### How to override  s-maxage value in Isomorphic Routes

For overriding the s-maxage value, We can set `isomorphicRoutesSmaxage: <value>` under publisher in publisher.yml config file that comes from BlackKnight or pass it from the app level.  The default value is set to 900 seconds.

- Make sure [@quintype/framework](https://www.npmjs.com/package/@quintype/framework) version is `5.0.5` or higher

**How to pass it from BlackKnight **

Go to [BlackKnight](https://black-knight.quintype.com/ "BlackKnight")  `/app/config/publisher.yml`,  add `isomorphicRoutesSmaxage:  <value>` under `publisher`.
Example :

```js
...
...

publisher: 
  ...
  isomorphicRoutesSmaxage: 1800
  ...
...
...

```


**How to pass it from app level**
- In the `server/app.js` [file](https://github.com/quintype/malibu/blob/master/app/server/app.js), pass an option `sMaxAge: <value>` to the `isomorphicRoutes` function like so:

  ```js
  isomorphicRoutes(app, {
    generateRoutes: generateRoutes,
    loadData: loadData,
    seo: generateSeo,
    ...
    sMaxAge: 1800
  });
  ```

- This will change the s-maxage value of `/route-data.json`, story and section pages, AMP pages, `mobile-data.json`, staticRoutes and custom routes passed from the app

- However, it won't change the s-maxage value of some requests like service-worker, shell.html, app manifest

#### How to override  s-maxage value in Upstream Quintype Routes

For overriding the s-maxage value for upstream routes(sketches routes),  set `upstreamRoutesSmaxage:  <value>` under publisher in publisher.yml config file that comes from BlackKnight or pass it from the app level. By default, the s-maxage value  will be the same as how it's set in sketches.

- Make sure [@quintype/framework](https://www.npmjs.com/package/@quintype/framework) version is `5.0.5` or higher

**How to pass it from BlackKnight **

Go to [BlackKnight](https://black-knight.quintype.com/ "BlackKnight")  `/app/config/publisher.yml`,  add `upstreamRoutesSmaxage:  <value>` under `publisher`.
Example :

```js
...
...

publisher: 
  ...
  upstreamRoutesSmaxage: 1800
  ...
...
...

```

**How to pass it from app level**
- In the `server/app.js` [file](https://github.com/quintype/malibu/blob/master/app/server/app.js), pass an option `sMaxAge: <value>` to the `upstreamQuintypeRoutes` function like so:

  ```js
  upstreamQuintypeRoutes(app, {sMaxAge: 1800});

  ```

- For `Breaking News(api/v1/breaking-news), /qlitics.js` and if the `cacheability is Private`, it is not overridden, instead the cache control will be the same as how it's set in sketches.