---
title: Implementing custom SEO logic
parent: Custom SEO
grand_parent: Malibu Tutorial
nav_order: 01
nav_exclude: true
---

# {{page.title}}

*This tutorial was contributed by [Tejas Dinkar](https://twitter.com/tdinkar)*

Most common requirements for SEO optimization are handled by [@quintype/seo](https://developers.quintype.com/quintype-node-seo/). However, it is possible to override parts of the behavior.

In our malibu app, a default set of SEO implementation containing the basic structured data and static tags can be found in `app/server/app.js`.

```javascript
isomorphicRoutes(app, {
    ...
  seo: new SEO({
    staticTags: {...},
    enableTwitterCards: true,
    enableOgTags: true,
    enableNews: true,
    structuredData: {...}
  })
});
```

## Adding a new generator

The custom SEO logic can be added by creating a custom [Generator](https://developers.quintype.com/quintype-node-seo/global.html#Generator), which runs after the standard generators.

Lets say we want to override the value of the *"twitter:creator"* tag. By default, this meta tag will have it's value set as the author of the story, but let's set it to the name of the publication.

Let's first create the generator. For simplicity, we will just add the generator in *app/server/app.js*.

```javascript
function MyGenerator(seoConfig, config, pageType, data, opts) {
  if(pageType === 'story') {
    const story = data.story; // ignored
    return [{tag: "meta", name: "twitter:creator", content: "My Journal"}]
  } else {
    return [];
  }
}
```

Each of the items returned by the generator will return a tag that gets converted to HTML tag.

Let's now add this generator to our SEO class

```javascript
isomorphicRoutes(app, {
    ...
  seo: new SEO({
    ...
    extraGenerators: [MyGenerator]
  })
});
```

Opening up any story page, you should see the tag taking the new value.

You may now proceed to [Custom seo metadata]({{"/tutorial/custom-seo-metadata" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
