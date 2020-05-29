---
title: Amp Library Integration
parent: Malibu Tutorial
nav_order: 08
---
# {{page.title}}

The amp library is shipped as a part of [@quintype/framework](https://www.npmjs.com/package/@quintype/framework). Integration basically involves telling framework not to route amp requests upstream, instead use the amp library routes.

To get the amp library, update the framework (At the time of writing, amp library is part of following version of framework >> `3.25.0-amp-library-integration.37`)

1.  In the frontend app's `app.js`, import function `ampRoutes` from `@quintype/framework/server/routes`
2.  if `forwardAmp: true` in `upstreamQuintypeRoutes`, either set it to false or remove it altogether
3.  add `ampRoutes` function preferably just below `upstreamQuintypeRoutes` in `app.js`
4.  ampRoutes takes two arguments just like the isomorphicRoutes function: `app` and `opts` object. Opts object can be empty.

### opts

opts object is used to pass customizations and config for the library. As of writing, it takes following properties
  - `seo` similar to `isomorphicRoutes`, used to generate seo for amp pages 
  - `templates` used to pass custom templates to the library 
  - `slots` used to pass config for slots 
  - `headerCardConfig` used to provide config to re-order components in story headerCard
  - `relatedStoriesRender` used to override related stories in story page

### Sample integration

```
import { ampRoutes } from "@quintype/framework/server/routes";

upstreamQuintypeRoutes(app);
ampRoutes(app, {
  seo: new SEO({
    ...
  })
});
```

You may now proceed back to the list of [Tutorials]({{"/tutorial" | absolute_url}})
