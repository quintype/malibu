---
title: Akamai Integration
parent: Third Party Integrations
grand_parent: Malibu Tutorial
nav_order: 04
---

# {{page.title}}

_This tutorial was contributed by [Ramsharan Gorur Jayaraman and Nandakishore Prakash Rao](https://twitter.com/sharangj)_

Quintype supports multiple content delivery networks. The favoured partner of Quintype is Cloudflare. If you have create a project of malibu, the cloudflare integration is supported by default.

## Configuring the Quintype APIs to use Akamai

Please configure the Quintype APIs to point to akamai. You can contact support [support@quintype.com](mailto:support@quintype.com) to get this done.

## Adding Akamai to your project through app/server/app.js

You can activate akamai by passing the `cdnProvider` property to the `isomorphicRoutes` function call. A sample function call would look like:

```
isomorphicRoutes(app, {
  ...
  cdnProvider: 'akamai',
});
```

You may now proceed back to the list of [Tutorials]({{"/tutorial" | absolute_url}}).
