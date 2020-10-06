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

return _loadData().then((data) => {
  return {
    httpStatusCode: data.httpStatusCode || 200,
    pageType: data.pageType || pageType,
    data: Object.assign({}, data, {
      navigationMenu: getNavigationMenuArray(
        config.layout.menu,
        config.sections
      ),
      customSeo: getCustomSeoMetadata(data, pageType),
    }),
    config: pick(config.asJson(), WHITELIST_CONFIG_KEYS),
  };
});

```
Where getCustomSeoMetadata(data, pageType) function which will take 2 args `data` and `pageType` and will return the list all custome seo related fields like `title`, `description`, `page-title`, `keywords`, `canonicalUrl`, `ogUrl`, `ogTitle` etc.

ex - Let's i wanted to override page title for `section page` with `|| My Journal` in the end of title. 

```javascript
function getCustomSeoMetadata(data, pageType) {
  switch (pageType) {
    case "section-page":
      return {
        title: data.collection.name + " || My Journal "
      };
    default:
      break;
  }
}
```
If you want to override for other pages, you just need to add one swith case and return your custom seo data in form of object. 
 
 For infinite story page you need to add `customSeo` in `storyPageLoadItems()` function of `<InfiniteStoryBase />`.

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
