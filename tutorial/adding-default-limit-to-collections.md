---
title: Support Default Limit to Collections
parent: Malibu Tutorial
nav_order: 12
---

# {{page.title}}

*This tutorial was contributed by [Athira](https://twitter.com/AthiraMRaju) and [Harshith](ttps://www.linkedin.com/in/harshith-raj-092ba4176)*

This tutorial is for setting the default collection items limit. If there are no `storyLimits` passed for a particular collection will fall back to `defaultNestedLimit` and if there is no `defaultNestedLimit` passed, it will fall back to 40.


## Steps to implement

* First ensure that *@quintype/framework* is at the latest version
* Pass `defaultNestedLimit` key with required default limit to `getCollectionBySlug` as shown below.

```javascript
...
import { getStoryLimits } from "../../isomorphic/components/get-collection-template";

export async function loadHomePageData(client, config, slug) {
  const collection = await Collection.getCollectionBySlug(
    client,
    slug,
    { "item-type": "collection" },
    { depth: 2, storyLimits: getStoryLimits(), defaultNestedLimit: 4  }
  );
  ...
}
```
