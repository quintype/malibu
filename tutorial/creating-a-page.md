---
title: Creating a Page
parent: Malibu Tutorial
nav_order: 02
---

In this chapter, we will add a new page to our Malibu app.

## Building a Story Page

In order to create a page, we need to create the respective route for that particular page. Routes are usually present in `app/server/routes.js`.


### Creating routes

Here, let's add a route. Say for example, let's start by adding a story page.

```
import { generateStoryPageRoutes } from "@quintype/framework/server/generate-routes";

export function generateRoutes(config) {
  return generateStoryPageRoutes(config, { withoutParentSection: true });
}

```

The above function can then be used in `app/server/app.js` while creating the `isomorphicRoutes` method.

More info about `generateStoryPageRoutes` method can be found [here](https://developers.quintype.com/quintype-node-framework/module-generate-routes.html).

### Picking the component
Once the route has been created the respective component for the StoryPage gets picked. This happens [here](https://github.com/quintype/malibu/blob/master/app/isomorphic/pick-component.js#L10).

### Loading the data
After the component is picked, the `story` data for the component comes from the file `app/server/data-loaders/story-page-data.js`.

So now that we have created a route, picked a respective component and loaded the data, all we need to do is to start rendering.

### Rendering

The file, `app/isomorphic/components/pages/story.js` is where we have the component to render the StoryPage.


## Building a custom page

Say for example we are creating an Author Page. We need to add a respective route for it in `app/server/routes.js`. Since the author page is not a static page, we put it under `ISOMORPHIC_ROUTES` and then export it.

```
import { generateStoryPageRoutes } from "@quintype/framework/server/generate-routes";

const ISOMORPHIC_ROUTES = [
  { path: "/author/:authorId", pageType: PAGE_TYPE.AUTHOR_PAGE, exact: true }
];

export function generateRoutes(config) {
  return ISOMORPHIC_ROUTES.concat(
    generateSectionPageRoutes(config, {}),
    generateStoryPageRoutes(config, { withoutParentSection: false })
  );
}

```

### Picking the component

Once the route has been created the respective component for the AuthorPage gets picked. In this case, we need to add authors page to the pick component list.

```
import { PAGE_TYPE } from "./constants";
import { pickComponentHelper } from "@quintype/framework/server/pick-component-helper";

const { pickComponent, getChunkName } = pickComponentHelper(
  {
    [PAGE_TYPE.HOME_PAGE]: { chunk: "list", component: "HomePage" },
    [PAGE_TYPE.SECTION_PAGE]: { chunk: "list", component: "SectionPage" },
    [PAGE_TYPE.TAG_PAGE]: { chunk: "list", component: "TagPage" },
    [PAGE_TYPE.SEARCH_PAGE]: { chunk: "list", component: "SearchPage" },
    [PAGE_TYPE.STORY_PAGE]: { chunk: "story", component: "StoryPage" },
    [PAGE_TYPE.CATALOG_PAGE]: { chunk: "list", component: "CatalogPage" },
    [PAGE_TYPE.STORY_PREVIEW]: { chunk: "story", component: "StoryPagePreview" },
    [PAGE_TYPE.AUTHOR_PAGE]: { chunk: "list", component: "AuthorPage" },
    [PAGE_TYPE.STORY_PUBLIC_PREVIEW_PAGE]: { chunk: "story", component: "StoryPage" },
    [PAGE_TYPE.HOME_PREVIEW]: { chunk: "list", component: "HomePagePreview" },
    default: { chunk: "list", component: "NotFoundPage" }
  },
  {
    list: () => import(/* webpackChunkName: "list" */ "./component-bundles/list.js"),
    story: () => import(/* webpackChunkName: "story" */ "./component-bundles/story.js")
  }
);

export { pickComponent, getChunkName };
```

As you can see,
```
[PAGE_TYPE.AUTHOR_PAGE]: { chunk: "list", component: "AuthorPage" }
```
got added.


### Loading the data

In this case, we need to add a file in `app/server/data-loaders` called
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

### Rendering

A new file has to be created `app/isomorphic/components/pages/authors.js` where it contains the `AuthorPage` component exported.

The file, `app/isomorphic/components/pages/authors.js` is where we have the component to render the AuthorPage.




