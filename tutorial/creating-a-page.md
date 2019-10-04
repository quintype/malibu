---
title: Creating a Page
parent: Malibu Tutorial
nav_order: 02
---

 At times, we might need to add a custom page apart from the default pages provided by the malibu app. A custom page can have its own logic of fetching respective data and to render a separate UI. In this chapter, we will add a new custom page to our Malibu app.

## Building a custom page

Say for example we are creating an Author Page. We need to add a respective route for it in `app/server/routes.js`. Since the author page is not a static page, we put it under `ISOMORPHIC_ROUTES` and then export it.

In `app/server/routes.js`. We add,

```
const ISOMORPHIC_ROUTES = [
  { path: "/author/:authorId", pageType: PAGE_TYPE.AUTHOR_PAGE, exact: true }
];

export function generateRoutes(config) {
  return ISOMORPHIC_ROUTES
}

```

### Picking the component

Once the route has been created the respective component for the AuthorPage gets picked. Refer [here](https://developers.quintype.com/malibu/isomorphic-rendering/server-side-architecture.html#pickcomponent) for more details on picking the component.

In our example, we add the following.
```

import { PAGE_TYPE } from "./constants";
import { pickComponentHelper } from "@quintype/framework/server/pick-component-helper";

const { pickComponent, getChunkName } = pickComponentHelper(
  {
  .....
  [PAGE_TYPE.AUTHOR_PAGE]: { chunk: "list", component: "AuthorPage" }
  .....
  },
  {
    .........
  }
);

export { pickComponent, getChunkName };

```

### Loading the data

In order to load the data, we need to add a condition for the Author page to make a call to a function that loads the data. We do this in `app/server/load-data.js`.

In `app/server/load-data.js`, we modify the `loadData` function to add the case which invokes the particular loadData call depending on the page.

Example, in `app/server/load-data.js`, we add the following 

```
import { loadAuthorPageData } from "./data-loaders/author-page-data";

export function loadData(pageType, params, config, client, { host, next }) {
  function _loadData() {
    switch (pageType) {
      ....
      ....
      case PAGE_TYPE.AUTHOR_PAGE:
        return loadAuthorPageData(client, params.authorId, config);
      ....
      ....
    }
  }
```

 We need to add a file in `app/server/data-loaders` called
`author-page-data.js` where we make an api call to get the respective author data.

```
import { Author } from "@quintype/framework/server/api-client";
import { storyToCacheKey } from "@quintype/framework/server/caching";

export const loadAuthorPageData = (client, authorId, config) => {
  const params = {
    "item-type": "story",
    limit: 10,
    offset: 0
  };

  const authorStories = Author.getAuthorCollection(client, authorId, params).then(({ items }) =>
    items.map(({ story }) => story)
  );

  const author = Author.getAuthor(client, authorId).then(({ author }) => author);

  return Promise.all([author, authorStories])
    .then(([author, stories]) => {
      return {
        author,
        stories,
        cacheKeys: stories.map(story => storyToCacheKey(config["publisher-id"], story))
      };
    })
    .catch(error => {
      console.log("in error", error);
    });
};
```

After the component is picked, the `author` data for the component comes from the file `app/server/data-loaders/author-page-data.js`.

So now that we have created a route, picked a respective component and loaded the data, all we need to do is to start rendering.

### Rendering the UI

A new file has to be created `app/isomorphic/components/pages/authors.js` where it contains the `AuthorPage` component exported.

The file, `app/isomorphic/components/pages/authors.js` is where we have the component to render the AuthorPage.

```
import React from "react";
......
......

class AuthorPage extends React.Component {
  render() {
    return
    <div> Author name is {this.props.author.name} </div>
  }
}

export { AuthorPage };
```


