---
title: Overriding Individual Meta Properties
parent: Custom SEO
nav_order: 02
---

# {{page.title}}

_This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)_

Most common requirements for SEO optimization are handled by [@quintype/seo](https://developers.quintype.com/quintype-node-seo/). However, it is possible to override parts of the behavior.

## Adding custom metadata

The custom metadata SEO logic can be added by passing the _"customSeo"_ object in load-data.js file.

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

The above customSeo object will overwrite all the metadata which you will pass in the object. For infinite story page you need to add _"customSeo"_ in _"storyPageLoadItems"_ function of _"<InfiniteStoryBase />"_.

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

Lets say we want to override page-title on section page. By default, this meta tag will have default value of metadata or section name coming from the api , but let's set it to the name of the publication after section name for page title.

Let's first create the getCustomSeoMetadata function.

```javascript
function getCustomSeoMetadata(data, pageType) {
  if (pageType === "section-page") {
    return {
      title: (data.collection.name || data.section.name) + " || My Journal",
    };
  } else {
    return {};
  }
}
```

Each of the items returned by the getCustomSeoMetadata will return a tag that gets converted to HTML tag.

Let's now call this getCustomSeoMetadata function to our load-data.js file like _"customSeo: getCustomSeoMetadata(data, pageType)"_

You may now proceed to [Loading Fonts]({{"/tutorial/loading-fonts" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
