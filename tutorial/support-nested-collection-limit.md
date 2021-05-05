---
title: Support Nested Collection Items Limit
parent: Malibu Tutorial
nav_order: 17
---

# {{page.title}}

*This tutorial was contributed by [Athira](https://twitter.com/AthiraMRaju) and [Harshith](ttps://www.linkedin.com/in/harshith-raj-092ba4176)*

This tutorial is for setting the nested collection items limit.

## Rationale

We noticed that */route-data.json* was massive for many publishers (publishers using nested collection in home or collection page). The vast majority of this data is stories that were not needed for the render of the home or collection page. Thus, we wanted to introduce a way to declaratively specify how many stories are loaded by each nested collection.

The `nestedCollectionLimit` is the number of stories or collection to fetch from each nested collection. Example:
- Home `(Level 1)`
  - Sports Row `(Level 2, Template - FourColGrid)`
    - Cricket `(Level 3, Type - collection)`
    - Football `(Level 3, Type - collection)`
    - Tennis `(Level 3, Type - collection)`

In the above example with `nestedCollectionLimit: {FourColGrid: [2, 3, 4]}`, the `Cricket` collection will fetch `2`  items, `Football` will fetch `3` items and `Tennis` will fetch `4` items respectively. (default: `defaultNestedLimit` || `40`)

Note: If `FourColGrid` is a collection having collections and stories, pass `null` for the respective position of the story.
Example:
- Home `(Level 1)`
  - Sports Row `(Level 2, Template- FourColGrid)`
    - Cricket `(Level 3, Type - collection)`
    - Story `(Level 3, Type - story)`
    - Football `(Level 3, Type - collection)`
    - Tennis `(Level 3, Type - collection)`

In this case, pass `nestedCollectionLimit: {FourColGrid: [2, null, 3, 4]}`.

## Steps to implement

To enable this feature the *@quintype/components* library needs to be updated to `v2.28.0` and *@quintype/framework* to `v4.13.8`.

* Add the following to *app/isomorphic/components/get-collection-template.js*:

```javascript
import templates from "./collection-templates";
 ...

const collectionLimits = Object.entries(templates).reduce(
  (acc, [key, value]) => Object.assign(acc, { [key]: value.nestedCollectionLimit }),
  {}
);

export function getNestedCollectionLimit() {
  return collectionLimits;
}
```
  
* Add the number of nested collection items to each component. For example, in *app/isomorphic/components/collection-templates/four-col-grid/index.js*, add the following:

```javascript
function FourColGrid(props) {
...
}
...
FourColGrid.nestedCollectionLimit = [4, 4, 2];
```

* Pass `nestedCollectionLimit: getNestedCollectionLimit()` as shown below.

```javascript
...
import { getStoryLimits, getNestedCollectionLimit } from "../../isomorphic/components/get-collection-template";

export async function loadHomePageData(client, config, slug) {
  const collection = await Collection.getCollectionBySlug(
    client,
    slug,
    { "item-type": "collection" },
    { depth: 2, storyLimits: getStoryLimits() , defaultNestedLimit: 4 , nestedCollectionLimit: getNestedCollectionLimit()}
  );
  ...
}
``` 

* In case you are wrapping components with *wrapEager* then add the following inside the function. For example, in *app/isomorphic/components/collection-templates/index.js*

```javascript
function wrapEager(f) {
  const wrappedComponent = function WrapEager(props) {
    ...
  };

  if (f.nestedCollectionLimit) {
    wrappedComponent.nestedCollectionLimit = f.nestedCollectionLimit;
  }

  return wrappedComponent;
}
```