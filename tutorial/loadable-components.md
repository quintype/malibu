---
title: Support Loadable Component
parent: Malibu Tutorial
nav_order: 16
---
# {{page.title}}

*This tutorial was contributed by [Athira](https://twitter.com/AthiraMRaju) and [Amogh](https://github.com/ags1773)*

`Loadable components` is a library to solve the React code-splitting client-side, server-side, critical CSS, by loading all the scripts asynchronously to ensure optimal performances.

The first step towards implementing this is passing the files(components) for which code splitting and SSR is needed.

The `quintype-node-build` has the `default` webpack and babel config. This has to be modified a little bit for the `quintype-node-build` to accept the entry files.

1. In `quintype-build.config.js` file :
   The naming and the structure of the keys in the config object has to be the same as shown below, only the entry files are configurable.

   In the example shown below, the `header` component and `nav-bar` are the components that are targetted and the corresponding path has to be the value of type `string`.

```
const quintypeBuildConfig = require("@quintype/build/config/quintype-build");
const loadableConfigObj = {
  loadableConfig: {
    entryFiles: {
      topbar: "./app/isomorphic/components/layouts/header",
      navbar: "./app/isomorphic/components/layouts/header/nav-bar",
      footer: "./app/isomorphic/components/layouts/footer"
    }
  }
};
const modifiedBuildConfig = { ...quintypeBuildConfig, loadableConfigObj };
module.exports = modifiedBuildConfig;
```

2. `@loadable/webpack-plugin` in `quintype-node-build` would        generate a stats file, which will then be utilized in the app to extract the CSS string that needs to be injected.

    In the example shown below in `app/server/handlers/render-layout.js` file, the `ChunkExtractor` extracts the specific entry points from the stats file.

    `extractor.getCssString()` gets the css as a raw string.

```
const statsFile = path.resolve("stats.json");
const extractor = new ChunkExtractor({ statsFile, entrypoints: ["topbar", "navbar", "footer"] });
export const getCriticalCss = async () => {
  const criticalCss = await extractor.getCssString();
  return criticalCss.trim();
};

const criticalCss = await getCriticalCss();

export async function renderLayout(res, params) {
  ...
  res.render(
    "pages/layout",
    Object.assign(
      {
        ...
        criticalCss: criticalCss,
        ...
      },
      params
    )
  );
}
```

In `views/pages/layout.ejs` file, the raw CSS string is injected as shown below:

```
<head>
...
  <style>
    <%- criticalCss %>
  </style>
...
</head>
```

3. The next step is rendering the HTML on the server side. For this, we have created a component called the [`renderLoadableReduxComponent`](https://developers.quintype.com/quintype-node-framework/module-render-loadable-redux-component.html) which will return a ready-to-render HTML string that is passed to the `layout.ejs` template for SSR.

    Example: The below `render-layout.js` file will pass the `topbar`, `navbar` and `footer` HTML to the layout.

```js
import { renderLoadableReduxComponent } from "@quintype/framework/server/render";
...
...
const statsFile = path.resolve("stats.json");
const extractor = new ChunkExtractor({ statsFile, entrypoints: ["topbar", "navbar", "footer"] });

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
        footer: renderLoadableReduxComponent(Footer, params.store, extractor),
        ...
      },
      params
    )
  );
}

```

In `views/pages/layout.ejs` file, the HTML string is injected as shown below:

```
<body>
...
  <div><%- topbar %></div>
  ...
  <header><%- navbar %></header>
  ...
  ...
  <footer><%- footer %></footer>
...
</body>
```
