---
title: Implementing custom timezone for structured data
parent: Custom SEO
grand_parent: Malibu Tutorial
nav_order: 03
nav_exclude: true
---

# {{page.title}}

*This tutorial was contributed by [Shraddha] & [Nandakishore]*

By default the date schema for the publishers in structured data is shown in the UTC time standard.
Some publishers require the dates in their structured data to be of a specific timezone.

## Adding custom timezone:
To enable this feature the [@quintype/seo](https://developers.quintype.com/quintype-node-seo/) library needs to be updated to v1.38.27.

The custom timezone can be added by passing the timezone value with the key as `timezone` inside the data in `_loadData()` function in load-data.js file.

```javascript
return _loadData().then((data) => {
  return {
    data: Object.assign({}, data, {
      navigationMenu: getNavigationMenuArray(config.layout.menu),
      timezone: "Asia/Kolkata"
    }),
  };
});
```

The expected value of date property in the structured data should be of the format `[-]CCYY-MM-DDThh:mm:ss[Z|(+|-)hh:mm]`([optional data]).
Ex: 2021-04-31T10:23:45+05:30
Ref: https://schema.org/DateTime
