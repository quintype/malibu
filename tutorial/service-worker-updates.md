---
title: Service Worker Updates
parent: Malibu Tutorial
nav_order: 30
nav_exclude: true
---

We have updated the workbox version from v2 to v6 in the service worker. If you are using *@quintype/framework* version *6.1.1* or higher than it, please update your service worker file.

In _views/js/service-worker.ejs_, You can update as shown below:

```javascript
<%- serviceWorkerHelper %>;

const shellUrl = "/shell.html?revision=<%= assetHash("app.js") %>-<%= configVersion %>";

const REQUIRED_ASSETS = [
  <%_ getFilesForChunks("app", "list", "story").map(x => { _%>
  "<%= x %>",
  <%_ }) _%>
  // Put fonts here
  shellUrl
];

initializeQServiceWorker({
  routes: <%- JSON.stringify(routes) %>,
  assets: REQUIRED_ASSETS,
  shell: shellUrl,
  hostname: <%- JSON.stringify(hostname) %>
});

workbox.routing.registerRoute(new RegExp('/route-data.json*'), new workbox.strategies.NetworkFirst());

```
