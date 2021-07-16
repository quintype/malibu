---
title: Arrow Integration to Malibu/Malibu Advanced
---
# {{page.title}}

_This tutorial was contributed by [Amogh](https://github.com/ags1773) and [Nandakishore Prakash Rao](https://twitter.com/nkp_adm)_

Apart from building custom components on the Malibu Advanced app, a wide range of components that are built as a part of the [Arrow](https://developers.quintype.com/quintype-node-arrow/) can also be included and customized based on the requirements.

The list of the Arrow components can be found [here](https://developers.quintype.com/quintype-node-arrow/).

As you clone the Malibu Advanced repository, you will be getting some of the Arrow components out of the box. If you intend to integrate Arrow to your existing app or if you have cloned from Malibu, please check [here](https://developers.quintype.com/quintype-node-arrow/?path=/story/introduction--getting-started)

Ex: ElevenStories, FourColTwelveStories, etc.

**Steps to add a new Arrow component to your app:**

* Please follow the initial steps [here](https://developers.quintype.com/quintype-node-arrow/?path=/story/introduction--getting-started).
* Please find the directory structure in the screenshot shown below:
![Arrow Directory structure]({{"images/arrow-directory-structure.png" | absolute_url}}).
* The Higher-order component is there to make the component more configurable.
* The above component should be made available in the BOLD CMS to be applied to a collection.
* If the black-knight is not having a `template-options.yml`, please add the file with `path` as `/app/config/template-options.yml` and value as shown below:

```
collection-layouts:
  - name: ArrowElevenStoriesRow
    display: Arrow Three Col Seven Stories
    options: []
```

* Make the collection template exportable in the `app/isomorphic/components/collection-templates/index.js` file, so that when the component is selected in Bold the corresponding component has to be rendered.

```javascript
import React from "react";
import { wrapCollectionLayout, EagerLoadImages } from "@quintype/components";
import { ArrowElevenStories } from "./eleven-stories";

function wrapEager(f) {
  ...
  ...
}

export default {
  ...
  ...
  ArrowElevenStories: wrapEager(wrapCollectionLayout(ArrowElevenStories)),
  ...
  ...
  defaultTemplate: wrapEager(wrapCollectionLayout(ArrowElevenStories))
};
```

* If the component is rendered above the fold or is intended to be rendered server-side, then there are a couple of ways to get that running.
    - Using Loadable Components: In `quintype-build.config.js`:

    ```javascript
    const quintypeBuildConfig = require("@quintype/build/config/quintype-build");

    const loadableConfigObj = {
      loadableConfig: {
        entryFiles: {
          ...
          ...
          arrowElevenStoriesCssChunk: "@quintype/arrow/ElevenStories/styles.arrow.css",
          ...
          ...
        }
      }
    };
    const modifiedBuildConfig = { ...quintypeBuildConfig, ...loadableConfigObj };

    module.exports = modifiedBuildConfig;
    ```

  To know more on how this works, please check [here](https://developers.quintype.com/malibu/tutorial/loadable-components.html)

    - Without Loadable Components: In `quintype-build.config.js`:

    ```javascript
    const quintypeBuildConfig = require("@quintype/build/config/quintype-build");

    const loadableConfigObj = {
      ...
      ...
    };
    const modifiedBuildConfig = { ...quintypeBuildConfig, ...loadableConfigObj, entryFiles: {
      arrowElevenStoriesCssChunk: "@quintype/arrow/ElevenStories/styles.arrow.css"
    }};

    module.exports = modifiedBuildConfig;
    ```

    - After adding the chunks to be rendered server side,to inject the css to the head, please follow the below snippets:

      In `render-layout.js`:

    ```javascript
    ...
    ...
    import { getArrowCss } from "../helpers";

    export async function renderLayout(res, params) {
      ...
      const arrowCss = await getArrowCss(params.store.getState());
      ...

      res.render(
        "pages/layout",
        Object.assign(
          {
            ...,
            ...,
            arrowCss,
            ...
          },
          params
        )
      );
    }
    ```

    In `app/server/helpers/index.js`:

      * Returns css of 1st arrow row. If 1st row isn't arrow, returns empty string.
      * This can be used to add styles while server-side rendering.
      * For this to work, separate CSS chunks need to be created for every arrow row that will be used in the app.
      * Layout names here should match those in template-options.yml.

    ```javascript
    export async function getArrowCss(state, { qtAssetHelpers = require("@quintype/framework/server/asset-helper") } = {}) {
      const layout = get(state, ["qt", "data", "collection", "items", 0, "associated-metadata", "layout"], null);
      const pageType = get(state, ["qt", "pageType"], "");
      const extractor = entryPoint => {
        const getExtractor = new ChunkExtractor({ statsFile, entrypoints: [entryPoint] });
        return getExtractor.getCssString();
      };
      switch (layout) {
        case "ArrowElevenStories":
          return getAsset("arrowElevenStoriesCssChunk.css", qtAssetHelpers);
        ...
        ...
        default:
          return "";
      }
    }

    function getAsset(asset, qtAssetHelpers) {
      const { assetPath, readAsset } = qtAssetHelpers;
      return assetPath(asset) ? readAsset(asset) : "";
    }
    ```