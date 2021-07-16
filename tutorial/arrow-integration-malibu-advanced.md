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

1. Please follow the initial steps [here](https://developers.quintype.com/quintype-node-arrow/?path=/story/introduction--getting-started).
2. Please find the directory structure in the screenshot shown below:
![Arrow Directory structure]({{"images/arrow-directory-structure.png" | absolute_url}}).
3. The Higher-order component is there to make the component more configurable.
4. The above component should be made available in the BOLD CMS to be applied to a collection.
5. If the black-knight is not having a `template-options.yml`, please add the file with `path` as `/app/config/template-options.yml` and value as shown below:
```
collection-layouts:
  - name: ArrowElevenStoriesRow
    display: Arrow Three Col Seven Stories
    options: []
```
6. Make the collection template exportable in the `app/isomorphic/components/collection-templates/index.js` file, so that when the component is selected in Bold the corresponding component has to be rendered.

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
7. If the component is rendered above the fold or is intended to be rendered server-side, then there are a couple of ways to get that running.