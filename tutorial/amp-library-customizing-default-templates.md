---
title: Jul 2020 - customizing the default amp lib templates
parent: Upgrading from Earlier Versions of Malibu
grand_parent: Malibu Tutorial
nav_order: 03
nav_exclude: true
---

# {{page.title}}

The Malibu framework comes with the [Quintype AMP library](https://www.npmjs.com/package/@quintype/amp). To be precise, the malibu framework uses [@quintype/framework](https://www.npmjs.com/package/@quintype/framework), which uses the amp library. 

In July 2020, a breaking change was made to the amp library API. And since the amp library comes as part of the @quintype/framework, a major version (v4.0.0) of the framework had to be published. If you're a malibu-based publisher, and wish to update `@quintype/framework` from v3.x.x to v4.x.x

-  if you're not using the [Quintype AMP library](https://www.npmjs.com/package/@quintype/amp), or are using the amp library but are not passing customizations to the amp library using render prop functions, you may upgrade without making any changes.
- But if you're passing render prop functions to the amp library, please make the following change:

### Before

```jsx
ampRoutes(app, {
  seo: generateAmpSeo,
  relatedStoriesRender: ({ relatedStories, config }) => <Alsoread stories={relatedStories} config={config} />,
  headerCardRender: ({ story, config }) => <Headercard story={story} config={config} />,
  infiniteScrollRender: ({ story, config, inlineConfig }) => (
    <AmpInfiniteScroll story={story} config={config} inlineConfig={inlineConfig} />
  ),
  storyElementRender: storyElementOverrides
});
```

### After

```jsx
ampRoutes(app, {
  seo: generateAmpSeo,
  render: {
    relatedStoriesRender: ({ relatedStories, config }) => <Alsoread stories={relatedStories} config={config} />,
    headerCardRender: ({ story, config }) => <Headercard story={story} config={config} />,
    infiniteScrollRender: ({ story, config, inlineConfig }) => (
      <AmpInfiniteScroll story={story} config={config} inlineConfig={inlineConfig} />
    ),
    storyElementRender: storyElementOverrides
  }
});
```
All the render functions that were previously passed directly in `opts` are put inside an object, and passed to a key called `render` in `opts`. This was done to clean up the API.
