---
title: Creating a Page
parent: Malibu Tutorial
nav_order: 02
---

In this tutorial, we will create a new page for an author. With this example, we will demonstrate how a custom page can have its own logic of fetching respective data, and how to render a separate UI.

If you would like to know how this works in more detail, consider reading the [Server Side Architecture]({{"/isomorphic-rendering/server-side-architecture" | absolute_url}}) document.

## Creating a pageType

The first step of any new page is to create a *pageType* for the page to be rendered.

In `app/isomorphic/constants.js`, we add the new constant

```javascript
export const PAGE_TYPE = Object.freeze({
  ...
  AUTHOR_PAGE: "author-page",
  ...
});
```

## Building a custom page

We first need to add a respective route for it in `app/server/routes.js`. Since the author page is not a static page, we put it under `ISOMORPHIC_ROUTES`, which is later exported by `generateRoutes`.

In `app/server/routes.js`, we add the following line:

```javascript
const ISOMORPHIC_ROUTES = [
  ...
  { path: "/author/:authorId", pageType: PAGE_TYPE.AUTHOR_PAGE, exact: true },
  ...
];
```

On the route `/author/:authorId`, the *pageType* will be set to *PAGE_TYPE.AUTHOR_PAGE*

### Loading the data

We next set up the data required for our page. We do this in `app/server/load-data.js`.

In `app/server/load-data.js`, we modify the *loadData* function to add the case which invokes the particular function call depending on the page.

Example, in `app/server/load-data.js`, we add the following

```javascript
import { loadAuthorPageData } from "./data-loaders/author-page-data";

export function loadData(pageType, params, config, client, { host, next }) {
  function _loadData() {
    switch (pageType) {
      ...
      case PAGE_TYPE.AUTHOR_PAGE:
        return loadAuthorPageData(client, params.authorId, config);
      ...
    }
  }
```

We need to add a file in `app/server/data-loaders` called `author-page-data.js` where we make an api call to get the respective author data.

```javascript
import { Author } from "@quintype/framework/server/api-client";
import { storyToCacheKey } from "@quintype/framework/server/caching";

export function loadAuthorPageData(client, authorId, config)  {
  const params = {
    "item-type": "story",
    limit: 10,
    offset: 0
  };

  const authorStories = Author.getAuthorCollection(client, authorId, params).then(({ items }) =>
    items.map(({ story }) => story)
  );

  const author = Author.getAuthor(client, authorId);

  return Promise.all([author, authorStories])
    .then(([author, stories]) => {
      return {
        author: author.asJson(),
        stories,
        cacheKeys: stories.map(story => storyToCacheKey(config["publisher-id"], story))
      };
    })
    .catch(error => {
      console.log("in error", error);
    });
}
```

So now that we have created a route, and loaded the data, all we need to do is to start rendering.

### Picking the component

Once the data is loaded, we are now ready to pick a component and render the UI.

In our example, we add the following.

```javascript
import { PAGE_TYPE } from "./constants";
import { pickComponentHelper } from "@quintype/framework/server/pick-component-helper";

const { pickComponent, getChunkName } = pickComponentHelper(
  {
  ...
  [PAGE_TYPE.AUTHOR_PAGE]: { chunk: "list", component: "AuthorPage" }
  ...
  }
);

export { pickComponent, getChunkName };
```

A new file has to be created `app/isomorphic/components/pages/author.js` where it contains the `AuthorPage` component exported.

The file, `app/isomorphic/components/pages/author.js` is where we have the component to render the AuthorPage.

```javascript
import React from "react";

export function AuthorPage({ data }) {
  const { author, stories } = data;
  return (
    <div>
      <p>Author name is {author.name}, they have written the following stories:</p>
      <ul>
        {stories.map(story => (
          <li><a href={story.url}>{story.headline}</a></li>
        ))}
      </ul>
    </div>
  );
}

```

And finally, we add the new component to `app/isomorphic/component-bundles/list.js` to be exported.

```javascript
...
export { AuthorPage } from "../components/pages/author";
...
```

## Seeing it all in action

Head over to [http://localhost:3000/author/2038](http://localhost:3000/author/2038), and you should see something like the following

![Author Page]({{"images/author-page.png" | absolute_url}})
