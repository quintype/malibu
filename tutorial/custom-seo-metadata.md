---
title: Overriding Individual Meta Properties
parent: Custom SEO
grand_parent: Malibu Tutorial
nav_order: 02
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)_

Most common requirements for SEO optimization are handled by [@quintype/seo](https://developers.quintype.com/quintype-node-seo/). However, it is possible to override parts of the behavior.

## Adding custom metadata

The custom metadata SEO logic can be added by passing the `customSeo` object in `data` of in `_loadData()` function in load-data.js file.

```javascript
import { getCustomSeoMetadata } from "../../../../server/data-loaders/custom-seo";

return _loadData().then((data) => {
  return {
    httpStatusCode: data.httpStatusCode || 200,
    pageType: data.pageType || pageType,
    data: Object.assign({}, data, {
      navigationMenu: getNavigationMenuArray(config.layout.menu),
      customSeo: getCustomSeoMetadata(data, pageType),
    }),
    config: pick(config.asJson(), WHITELIST_CONFIG_KEYS),
  };
});

```
Where getCustomSeoMetadata(data, pageType) function which will take 2 args `data` and `pageType` and will return the list of all custom SEO related fields like `title`, `description`, `page-title`, `keywords`, `canonicalUrl`, `ogUrl`, `ogTitle`, `ogDescription`, `twitterTitle`, `twitterDescription`, `keywords`. Make sure that the keywords should be in form of string with comma separated. ex- 'opinion, sports, videos, myjournal'.

ex - Let's see the example of overriding section page SEO data.

```javascript
function getCustomSeoMetadata(data, pageType) {
  switch (pageType) {
    case "section-page":
      return {
        title: data.collection.name + " || My Journal ",
        description: "Custom description",
        ogTitle: "og custom title",
        ogDescription: "og custom description",
        keywords: 'opinion, sports, videos, myjournal'
      };
    default:
      break;
  }
}
```
The above function will override section page custom SEO data with title, description, ogTilte, ogDescription, and keywords. if you want to override the SEO for other pages then, you have to add a switch case in the above function return custom SEO data in form of object.
 
 For an infinite story page, you need to add `customSeo` in `storyPageLoadItems()` function of `<InfiniteStoryBase />` to update the custom SEO for all the stories appearing in the infinite scroll.

## Before customSeo

```javascript
function storyPageLoadItems(pageNumber) {
  return global
    .wretch("/api/v1/stories")
    .query({
      fields: FIELDS,
      limit: 5,
      offset: 5 * pageNumber,
    })
    .get()
    .json((response) =>
      response.stories.map((story) => ({ story, otherProp: "value" }))
    );
}

export function StoryPage(props) {
  return (
    <InfiniteStoryBase
      {...props}
      render={StoryPageBase}
      loadItems={storyPageLoadItems}
      onInitialItemFocus={(item) =>
        app.registerPageView(
          { pageType: "story-page", data: { story: item.story } },
          `/${item.story.slug}`
        )
      }
      onItemFocus={(item) =>
        console.log(`Story In View: ${item.story.headline}`)
      }
    />
  );
}
```

## After adding customSeo

```javascript
function storyPageLoadItems(pageNumber) {
  return global
    .wretch("/api/v1/stories")
    .query({
      fields: FIELDS,
      limit: 5,
      offset: 5 * pageNumber,
    })
    .get()
    .json((response) =>
      response.stories.map((story) => ({
        story,
        otherProp: "value",
        customSeo: getCustomSeoMetadata(story, "story-page"),
      }))
    );
}

export function StoryPage(props) {
  return (
    <InfiniteStoryBase
      {...props}
      render={StoryPageBase}
      loadItems={storyPageLoadItems}
      onInitialItemFocus={(item) =>
        app.registerPageView(
          {
            pageType: "story-page",
            data: {
              story: item.story,
              customSeo: getCustomSeoMetadata(item.story, "story-page"),
            },
          },
          `/${item.story.slug}`
        )
      }
      onItemFocus={(item) =>
        console.log(`Story In View: ${item.story.headline}`)
      }
    />
  );
}
```

You may now proceed to [Loading Fonts]({{"/tutorial/loading-fonts" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
