---
title: Disabling Service Worker and Progressive Web App (PWA)
parent: Advanced Topics
grand_parent: Malibu Tutorial
nav_order: 03
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Ramsharan Gorur Jayaraman](https://github.com/sharangj)_

You can disable the Service Worker and the Progressive Web App (PWA) in Malibu if you are not interested in sharing your content offline and allowing users to cache your assets on their browser.
If you dont want your users to install the PWA, please disable only the PWA and keep the service worker running. We dont recommend disabling PWA as it does not take traffic away from your main resources and does not drain SEO. All the bots do not access the PWA because they make a request directly to our servers and they dont look at the cached shell that is created by the PWA.

## Disabling Progressive Web App

In _views/js/service-worker.ejs_, You can comment or remove lines as shown below:

```javascript
<%- serviceWorkerHelper %>;

// const REQUIRED_ASSETS = [
//   <%_ getFilesForChunks("app", "list", "story").map(x => { _%>
//   "<%= x %>",
//   <%_ }) _%>
//   // Put fonts here
//   {url: '/shell.html', revision: '<%= assetHash("app.js") %>'}
// ];

// const workbox = initializeQServiceWorker(self, {
//   routes: <%- JSON.stringify(routes) %>,
//   assets: REQUIRED_ASSETS,
//   hostname: <%- JSON.stringify(hostname) %>
// });

// workbox.router.registerRoute('/route-data.json', workbox.strategies.networkFirst());
```

You should now see all pages with the server side rendered code in the `View Page Source` tab in Chrome.
