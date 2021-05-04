---
title: Support Nested Collection Items Limit
parent: Malibu Tutorial
nav_order: 17
---

# {{page.title}}

*This tutorial was contributed by [Athira](https://twitter.com/AthiraMRaju) and [Harshith](ttps://www.linkedin.com/in/harshith-raj-092ba4176)*

This tutorial is for setting the nested collection items limit.
## Rationale

We noticed that */route-data.json* was massive for many publishers (publishers using collection of collection in home/collection page). After debugging, we found that the vast majority of this data is stories that were not needed for the render of the home/collection page. Thus, we wanted to introduce a way to declaratively specify how many stories are loaded by each nested collection.

The `nestedCollectionLimit` is the number of stories or collection to fetch from each nested collection. 

Eg:
- Home `(Level 1)`
  - Sports Row `(Level 2)` `(Template- FourColGrid)`
    - Cricket `(Level 3)`
    - Football `(Level 3)`
    - Tennis `(Level 3)`

In the above example with `nestedCollectionLimit: {FourColGrid: [2, 3, 4]}`, The `Cricket` collection will fetch `2`  items, `Football` will fetch `5` items and `Tennis` will fetch `4` items respectively. (default: `defaultNestedLimit` || `40`)

## Steps to implement

* First Ensure that  *@quintype/components* and *@quintype/framework* are at the latest version

* Add the following to *app/isomorphic/components/get-collection-template.js*

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

* Pass `nestedCollectionLimit` key with required nested collection items limit to `getCollectionBySlug` as shown below.

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