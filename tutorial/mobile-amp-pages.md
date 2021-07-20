---
title: Rendering amp story pages on mobile
parent: Malibu Tutorial
nav_order: 23
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Ramsharan Gorur Jayaraman](https://github.com/sharangj)_

Malibu supports rendering amp pages as story pages only on mobile.

## Steps to implement

- First Ensure that _@quintype/framework_ is at the latest version

- In _app/server/app.js_, pass the _lightPages_ prop to the _isomorphicRoutes_ function. This ensures that a response header called `X-QT-Light-Pages-Url` is set.

```javascript
isomorphicRoutes(app, {
  appVersion: require("../isomorphic/app-version"),
  ...
  lightPages: true,
  ...
  preloadJs: true,
  preloadRouteData: true
});
```

- Disable Ajax navigation in _app/server/handler/render-layout.js_

```javascript
export function renderLayout(res, params) {
  const chunk = params.shell ? null : allChunks[getChunkName(params.pageType)];

  res.render(
    "pages/layout",
    Object.assign(
      {
        ...
        disableAjaxNavigation: false,
      },
      params
    )
  );
}
```

You should now see all the story pages rendering an amp page on mobile only.

## Known Caveats

This feature is available only if you are using the Cloudflare CDN.
