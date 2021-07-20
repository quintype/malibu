---
title: Amp Library Integration
parent: Malibu Tutorial
nav_order: 07
---
# {{page.title}}

The [amp library](https://developers.quintype.com/quintype-amp) is shipped as a part of [@quintype/framework](https://www.npmjs.com/package/@quintype/framework). Integration basically involves telling framework not to route amp requests upstream, instead use the amp library routes.

To get the amp library, update `@quintype/framework` to the latest version (`3.29.0` or greater)

1.  In the frontend app's `app.js`, import function `ampRoutes` from `@quintype/framework/server/routes`
2.  if `forwardAmp: true` in `upstreamQuintypeRoutes`, either set it to false or remove it altogether
3.  add `ampRoutes` function preferably just below `upstreamQuintypeRoutes` in `app.js`
4.  ampRoutes takes two arguments just like the isomorphicRoutes function: `app` and `opts` object. Opts object can be empty.

### opts

opts object is used to pass customizations and config for the library. As of writing, it takes following properties

| Opts key | Details |
| ------ | ------ |
| seo | similar to `isomorphicRoutes`, used to generate seo for amp pages |
| templates | used to pass custom templates to the library  |
| slots | used to pass config for slots  |
| headerCardRender | used to override headerCard in story page |
| relatedStoriesRender | used to override related stories in story page |
| infiniteScrollRender | used to override infinite scroll in story page |

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
