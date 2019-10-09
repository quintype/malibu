---
title: Custom SEO
parent: Malibu Tutorial
nav_order: 04
---

Most of the SEO is handled by [Quintype Node SEO](https://developers.quintype.com/quintype-node-seo/).

In our malibu app, a default set of SEO implementation containing the basic structured data and static tags can be found in `app/server/app.js`.

```javascript
isomorphicRoutes(app, {
    ....
    ....
  seo: new SEO({
    staticTags: {.....},
    enableTwitterCards: true,
    enableOgTags: true,
    enableNews: true,
    structuredData: {.....}
  })
});
```

The custom SEO logic can be added by using [Generators](https://developers.quintype.com/quintype-node-seo/global.html#Generator)


Lets say we want to add a custom tag, we can do it as follows

```javascript
isomorphicRoutes(app, {
    ....
    ....
  seo: new SEO({
    .....
    .....
    generators: [
        [{name: "twitter:creator", content: "(path to get twitter:creator content)"}]
    ]
  })
});
```

Each of the item in generator will return a tag that gets converted to HTML tag. The above piece of code adds `twitter:creator` tag.