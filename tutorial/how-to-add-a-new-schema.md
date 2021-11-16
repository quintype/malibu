---
title: How to Add a New Schema Markup
parent: Custom SEO
grand_parent: Malibu Tutorial
nav_order: 03
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Athira](https://www.linkedin.com/in/athira-m-r-835ab6105)_
Structured data, also called schema markup, is a type of code that makes it easier for search engines to crawl, organize, and display your content. Most common requirements for SEO optimization are handled by [@quintype/seo](https://developers.quintype.com/quintype-node-seo/). However, it is possible to create a new schema markup according to different page type.

## Adding new schema

Let’s say you want to add `WebPage` Schema  for all story pages. Follow the steps below!

1 . Go to `app/server/app.js` and pass list of `generators`, array items to `generateSeo` function to support custom schema.
Eg:

```javascript
import { SEO, generateStructuredData, ImageTags, StaticTags, StructuredDataTags, AuthorTags, TextTags } from "@quintype/seo";
...
...
function generateSeo(config) {
  const seoData = {
    ...
    ...
    ...
    
    generators: [
      customizedTags(config),
      StaticTags,
      StructuredDataTags,
      ImageTags,
      AuthorTags,
      TextTags
    ]
  };
...
...

  return new SEO(seoData);
}
...
isomorphicRoutes(app, {
  ...
  seo: generateSeo,
  ...
});

...
ampRoutes(app, {
  seo: generateSeo
});

```

2. Create a custom schema markup

```javascript
const webPageSchema = (story, config) => {
  const schemaMarkup = {
    ...
    ...

    "@context": "http://schema.org",
    "@type": "WebPage",
    publisher: {
      "@type": "Organization",
      name: "Malibu",
      url: "https://malibu-advanced-web.quintype.io",
      logo: {
        "@type": "ImageObject",
        url: get(config,["theme-attributes","logo_url"], "https://quintype-dropbox.s3-accelerate.amazonaws.com/malibu.quintype.com/2021-06-02/662/malibu_logo_new__1_.png") ,
        name: "Malibu"
    },
    author: {
      "@type": "Person",
      name: story["author-name"],
      url: `${config["sketches-host"]}/author/${get(story, ["authors", 0, "slug"])}`
    },
    ...
    ...
      
    }
    
  };
  return schemaMarkup;
};

...
...

const customizedTags = config => {
  return (seoConfig, config, pageType, data, { url = {} }) => {
    const tags = [];
    const schema = webPageSchema(data.data.story, config);
    tags.push({
      tag: "script",
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(schema) }
    });
    return tags;
  };
};

```

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
