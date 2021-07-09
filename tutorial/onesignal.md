---
title: OneSignal Integration
parent: Third Party Integrations
grand_parent: Malibu Tutorial
nav_order: 02
---

# {{page.title}}

*This tutorial was contributed by [Sai Charan](https://twitter.com/saiicharan) ,[Tejas Dinkar](https://twitter.com/tdinkar) and [Deo kumar](https://www.linkedin.com/in/deo-kumar/) and [Nandakishore Prakash Rao](https://twitter.com/nkp_adm)*

In this tutorial, we will learn how to integrate [OneSignal](https://onesignal.com/) into our malibu app.

OneSignal is a popular push notification service for websites and mobile apps. Commonly, publishers use OneSignal to send notifications of breaking news to the consumers of the website.

First, ensure that _@quintype/framework_ is at the *4.8.4* or latest version.

Then we start adding the respective details about OneSignal in the publisher config that will be needed by the OneSignal script and also will add one toggle which will enable or disable OneSignal from the app.

## OneSignal Configuration with app

In Black Knight, the `config/publisher.yml` should be added if it is not present already and update the yml file with the following:

```yaml
publisher :
  onesignal:
    safari_web_id: ""
    is_enable: true
    time_out: 4000
```

| Opts key | Type | Details |
| ------ | ------ | ------ |
| safari_web_id | string | The safari web id provided by onesignal. |
| is_enable | boolean | This enables or disables onesignal integration to the app.
| time_out | number | This sets the timeout value for the Onesignal script to be loaded(in ms). It delays the onesignal script to reduce the impact of third party code which affects the page speed score. This arbitrary number might change depending upon the script parsing and the page rendering. |


## OneSignal configuration with Bold

Add OneSignal app id in [Bold integration](https://malibu.staging.quintype.com/settings/integrations)

![One signal integration]({{"images/onesignal.png" | absolute_url}})

## Registering The OneSignal ServiceWorker

Push notifications work via ServiceWorker. In order to register the service worker script,
we add the code required for OneSignal service worker at the bottom of the service-worker file `views/js/service-worker.ejs`.

```javascript
<%- serviceWorkerHelper %>;
...
  if("<%= config["public-integrations"]["one-signal"] &&  config["public-integrations"]["one-signal"]["app-id"] %>") {
    importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');
  }
...
```

Next, register the service worker by adding the functionality in our `/client/app.js` file.

```javascript
if (window.OneSignal) {
  Object.assign(opts, {
    serviceWorkerLocation: "/OneSignalSDKWorker.js" // OneSignal will automatically register the service worker
  });
}
```

In order to enable OneSignal service worker we need to set `oneSignalServiceWorkers` to be `true` in isomorphicRoutes of `app/server/app.js` file.

```javascript
...
isomorphicRoutes(app, {
  ...
  oneSignalServiceWorkers: true
  ...
});
```

The Onesignal settings are configured in _@quintype/framework_ and the script needs to be included inside the head tag of the app. In `views/pages/layout.ejs`:

```html
<head>
...
<%_ if(isOnesignalEnable) { _%>
  <%- oneSignalScript -%>
<%_ } _%>
...
</head>
```

The `oneSignalScript` and the `isOnesignalEnable` above is passed from the `app/server/handlers/render-layout.js`:

```javascript
const getConfig = state => {
  return {
    ....
    isOnesignalEnable: get(state, ["qt", "config", "publisher-attributes", "onesignal", "is_enable"], false)
    ...
  };
};

...
...

export async function renderLayout(res, params) {
  const { ..., isOnesignalEnable, ... } = getConfig(params.store.getState());

  res.render(
    "pages/layout",
    Object.assign(
      {
        ...
        isOnesignalEnable,
        oneSignalScript: params.oneSignalScript
        ...
      },
      params
    )
  );
}
```

Congratulations, we are all done. The next time a user comes to your app, they should get a prompt asking if they'd like to receive push notifications and remove app id from bold.

You can disable onesignal push notification by setting *is_enable:false* in the *config/publisher.yml* config file.

**Note:** When the timeout is added here with the integration, you might want to reduce the popup loading time in the OneSignal dashboard, so that the delay is not increased.

You may now proceed to [Gumlet Integration]({{"/gumlet-integration" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
