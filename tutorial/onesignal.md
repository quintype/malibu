---
title: OneSignal Integration
parent: Third Party Integrations
nav_order: 02
---

# {{page.title}}

*This tutorial was contributed by [Sai Charan](https://twitter.com/saiicharan) and [Tejas Dinkar](https://twitter.com/tdinkar)*

In this tutorial, we will learn how to intergrate [OneSignal](https://onesignal.com/) to our malibu app.

OneSignal is a popular push notification service for websites and mobile apps. Commonly, publishers use OneSignal to send notifications of breaking news to the consumers of the website.

We first start by adding the respective details about OneSignal in the publisher config that will be needed by the OneSignal script

## Rendering the appropriate tags in the layout.

Update your *config/publisher.yml* to add configuration related to OneSignal.

```yaml
publisher :
  onesignal:
    app_id: "some_uuid"
    safari_web_id: ""
    tag_name: "publisher-breaking-news"
```

Now that we have the onesignal details in publisher the config file, we need to get it into our app.

In *app/server/handlers/render-layout.js*, we add oneSignalConfig to the render

```javascript
import get from "lodash/get";

const getOnesignalConfig = state =>
  get(state, ["qt", "config", "publisher-attributes", "onesignal"], {});

export function renderLayout(res, params) {
  res.render(
    "pages/layout",
    Object.assign(
      {
        ...
        oneSignalConfig: getOnesignalConfig(params.store.getState()),
        ...
      },
      params
    )
  );
}
```

In our views, we create a following file in *views/pages/partials* called *onesignal.ejs* and add the following script.

```html
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async="async"></script>
<script>
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "<%= oneSignalConfig.app_id %>",
      autoRegister: true,
      notifyButton: {
        enable: true /* Set to false to hide */
      },
      safari_web_id: "<%= oneSignalConfig.safari_web_id %>"
    });
  });
  OneSignal.push(["sendTag", "<%= oneSignalConfig.tag_name %>", "true"]);
</script>
```

The above file is a partial file, which includes the oneSignal script along with the data in respective place in the script as mentioned in the *publisher/config.yml*.

The above file then has to be included in the main *layout.ejs* file.

In `views/pages/layout.ejs`,

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <%- include ./partials/onesignal -%>
    ...
  </head>
    <body>
    ...
    </body>
</html>
```

## Registering The OneSignal ServiceWorker

Push notifications work via ServiceWorker. In order to register the script, we need to add the functionality to our service worker.

First we add the script to our service worker.

In *app/views/js/service-worker.ejs*, we add the code required for OneSignal service worker at the bottom of the service-worker

```javascript
<%- serviceWorkerHelper %>;
...
importScripts('https://cdn.onesignal.com/sdks/OneSignalSDK.js')
```

And in *app/server/app.js*, we alias the ServiceWorker with a new name for OneSignal.

```javascript
...
isomorphicRoutes(app, {
  ...
  serviceWorkerPaths: ["/service-worker.js", "/OneSignalSDKWorker.js", "/OneSignalSDKUpdaterWorker.js"]
  ...
});
```

Congratulations, we are all done. The next time a user comes to your app, they should get a prompt asking if they'd like to receive push notifications.

You may now proceed back to the list of [Tutorials]({{"/tutorial" | absolute_url}}).
