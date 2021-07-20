---
title: Mounting at a Subdirectory
parent: Malibu Tutorial
nav_order: 22
nav_exclude: true
---

# {{page.title}}

*This tutorial was contributed by [Tejas Dinkar](https://twitter.com/tdinkar)*

In Jan 2020, malibu added support for mounting the `@quintype/framework` in a subdirectory. Your entire app will be served from the subdirectory mentioned, and all requests for pages outside of this subdirectory will result in a `404 - Not Found`. It is up to the publisher to host the domain, and ensure that appropriate requests are forwarded to the Quintype servers.

## Steps to implement

* First Ensure that *@quintype/backend*, *@quintype/components* and *@quintype/framework* are at the latest version

* In *app/server/app.js*, we pass the mountPoint to the `createApp` function

```javascript
import createApp from "@quintype/framework/server/create-app";
...
export const app = createApp({mountAt: "/foo"});
```

* Add the following to your layout, so that the malibu client knows where qt is mounted

```html
<script type="text/javascript">window.qtMountAt = '/foo';</script>
```

* Add the mountpoint to the following points in the service-worker.ejs

```javascript
const REQUIRED_ASSETS = [
  ...
  {url: '/foo/shell.html?revision=<%= assetHash("app.js") %>'}
];
...
const workbox = initializeQServiceWorker(self, {
  ...,
  mountAt: '/foo'
});
...
workbox.router.registerRoute('/foo/route-data.json', workbox.strategies.networkFirst());
```

* Contact [Quintype Support](support@quintype.com) to have the subdirectory updated in our database records. This is a manual step currently.

That's it. You should now see `http://localhost:3000` returning a 404, and your home page having shifted to `http://localhost:3000/foo`.

## Note on how stories are linked

Links to stories may break if you are determining the path to the story with `/${story.slug}`, which is how it was done in earlier versions of malibu. Instead use `story.url` and `section["section-url"]` to get the absolute path to stories and sections respectively. These functions are also safe for use with multi domain support.

You can use the following script to correct links on OSX (bash4 or zsh)

```bash
sed -i "" 's/\/\(.*\)story\.slug/\1story.url/g' app/**/*.js
```

## Known Caveats

Subdirectory support has not been tested with the following features
* Multi Domain Support
* Authentication and Login
