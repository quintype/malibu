---
title: Dec 2019 - Adding Story Limits to Collections
parent: Upgrading from Earlier Versions of Malibu
grand_parent: Malibu Tutorial
nav_order: 01
nav_exclude: true
---

# {{page.title}}

*This tutorial was contributed by [Tejas Dinkar](https://twitter.com/tdinkar)*

In Dec 2019, support for limiting the number of stories loaded by each component was added to malibu. Please follow this guide if you've forked malibu before Dec 2019. This should not be needed if your repo was forked after Dec 2019.

## Rationale

We noticed that */route-data.json* was massive for many publishers (nearly 2mb for some home pages). After debugging, we found that the vast majority of this data is stories that were not needed for the render of the home page. Thus, we wanted to introduce a way to declaratively specify how many stories are loaded by each collection component.

## Steps to implement

* First Ensure that *@quintype/backend*, *@quintype/components* and *@quintype/framework* are at the latest version

* Add the following to *app/isomorphic/components/get-collection-template.js*

```javascript
export function getCollectionTemplate(...) {
  ...
}

const storyLimits = Object.entries(templates).reduce(
  (acc, [key, value]) => Object.assign(acc, { [key]: value.storyLimit }),
  {}
);

export function getStoryLimits() {
  return storyLimits;
}
```

* Add the following to relevant data loaders, such as *app/server/data-loaders/home-page-data.js*

```javascript
...
import { getStoryLimits } from "../../isomorphic/components/get-collection-template";
...
export async function loadHomePageData(client, config, slug) {
  const collection = await Collection.getCollectionBySlug(
    client,
    slug,
    { "item-type": "collection" },
    { depth: 1, storyLimits: getStoryLimits() }
  );
  ...
}
```

* Finally, add the number of stories to each component. For example, in *app/isomorphic/components/collection-templates/four-col-grid/index.js*, add the following

```javascript
function FourColGrid(props) {
...
}
...
FourColGrid.storyLimit = 8;
```

* In case you are wrapping components in a function, such as *wrapEager*, then add the following to the relevant function (in this case in *app/isomorphic/components/get-collection-template.js*)

```javascript
function wrapEager(f) {
  const wrappedComponent = function WrapEager(props) {
    ...
  };

  if (f.storyLimit) {
    wrappedComponent.storyLimit = f.storyLimit;
  }

  return wrappedComponent;
}
```
