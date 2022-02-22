---
title: How to Override Author Url in Person Schema
parent: Custom SEO
grand_parent: Malibu Tutorial
nav_order: 04
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Athira](https://www.linkedin.com/in/athira-m-r-835ab6105)_

In August 2021, Google updated its [Schema-based structured data recommendations](https://developers.google.com/search/docs/data-types/article "Schema-based structured data recommendations") to include linking to an author’s bio page to help it disambiguate the correct author for an article. Most common requirements for SEO optimization are handled by [@quintype/seo](https://developers.quintype.com/quintype-node-seo/).This change is available in [@quintype/seo@1.40.0] (https://www.npmjs.com/package/@quintype/seo/v/1.40.0) version or more. By default the author URL will be `<Domain>/author/<authorSlug>` `Example: https://malibu-advanced-web.quintype.io/author/shraddha-k`

## How to override author URL in Person Schema

Let’s see how we can override author URL according to different publishers, for that we need to pass `authorSchema` function to structuredData which accept story as a paran and returns an array of authors with name and URL.

```javascript
"authorSchema" : (story)=> story.authors.map((author)=> {
    return {
      name: author.name,
      url: `${config['sketches-host']}/author/${author.id}`
    }

```    

1 . Go to `app/server/app.js` and pass `authorSchema` function to structuredData

Example:

```javascript
import { SEO, generateStructuredData, ImageTags, StaticTags, StructuredDataTags, AuthorTags, TextTags } from "@quintype/seo";
...
...
function generateSeo(config) {

  return new SEO({
    ...
    structuredData: Object.assign(generateStructuredData(config), {
      ...
      ...
      "authorSchema" : (story)=> getAuthorWithUrl(story, config)

    }),
    ...
    ....
  });
}
...
...
const getAuthorWithUrl = (story, config) => {
  return story.authors.map((author)=>{
    return {
      name: author.name,
      url: `${config['sketches-host']}/author/${author.id}`
    }
  })
}

```

