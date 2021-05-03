---
title: Support Nested Collection Items Limit
parent: Malibu Tutorial
nav_order: 17
---

# {{page.title}}

*This tutorial was contributed by [Athira](https://twitter.com/AthiraMRaju) and [Harshith](ttps://www.linkedin.com/in/harshith-raj-092ba4176)*

This tutorial is for setting the nested collection items limit. The `nestedCollectionLimit` is the number of stories or collection to fetch from each nested collection. 
Eg:
- Home `(Level 1)`
  - Sports Row `(Level 2)` `(Template- FourColGrid)`
    - Cricket `(Level 3)`
    - Football `(Level 3)`
    - Tennis `(Level 3)`

In the above example with `nestedCollectionLimit: {FourColGrid: [2, 3, 4]}`, The `Cricket` collection will fetch `2`  items, `Football` will fetch `5` items and `Tennis` will fetch `4` items respectively. (default: `defaultNestedLimit` || `40`)

## Steps to implement

* First ensure that *@quintype/framework* is at the latest version
* Pass `nestedCollectionLimit` key with required nested collection items limit to `getCollectionBySlug` as shown below.

```javascript
...
export async function loadHomePageData(client, config, slug) {
  const collection = await Collection.getCollectionBySlug(
    client,
    slug,
    { "item-type": "collection" },
    { depth: 2, storyLimits: { FourColGrid: 8 }, defaultNestedLimit: 4 , nestedCollectionLimit: {FourColGrid: [2, 3, 4]}}
  );
  ...
}
```