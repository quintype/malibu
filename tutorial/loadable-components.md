---
title: Support Loadable Component
parent: Malibu Tutorial
nav_order: 16
---
# {{page.title}}

*This tutorial was contributed by [Athira](https://twitter.com/AthiraMRaju) and [Amogh](https://github.com/ags1773)*

`Loadable components` load all your scripts asynchronously to ensure optimal performances(SSR). Which basically uses a loadable `stats` file created by webpack and from which we get to know which chunks need which JS.
The `quintype-node-build` has the `default` webpack and babel config. For that to be overridden, we will have to follow the below steps.

1. In `quintype-build.config.js` file :
   The naming and the structure of the keys in the config object has to be exactly the same as shown below, only the entry files are configurable. The entry files need to be comma-separated.

```
const quintypeBuildConfig = require("@quintype/build/config/quintype-build");
const loadableConfigObj = {
  loadableConfig: {
    entryFiles: {
      topbarCriticalCss: "./app/isomorphic/components/header",
      navbarCriticalCss: "./app/isomorphic/components/header/nav-bar"
    }
  }
};
const modifiedBuildConfig = { ...quintypeBuildConfig, loadableConfigObj };
module.exports = modifiedBuildConfig;
```

2. [`renderLoadableReduxComponent`](https://developers.quintype.com/quintype-node-framework/module-render-loadable-redux-component.html) will return ready-to-render html string that is passed to the `layout.ejs` template for SSR.

Example: The below `render-layout.js` file will pass the `topbar` and `navbar` html to layout

```js
import { renderLoadableReduxComponent } from "@quintype/framework/server/render";

// renderLayout is passed to isomorphicRoutes
export async function renderLayout(res, params) {
  ...
  res.render(
    "pages/layout",
    Object.assign(
      {
        ...
        topbar: renderLoadableReduxComponent(Header, params.store, extractor),
        navbar: renderLoadableReduxComponent(NavBar, params.store, extractor),
        ...
      },
      params
    )
  );
}

```
