---
title: OneSignal Integration
parent: Third Party Integrations
grand_parent: Malibu Tutorial
nav_order: 02
---

# {{page.title}}

*This tutorial was contributed by [Sai Charan](https://twitter.com/saiicharan) ,[Tejas Dinkar](https://twitter.com/tdinkar) and [Deo kumar]()https://www.linkedin.com/in/deo-kumar/*

In this tutorial, we will learn how to intergrate [OneSignal](https://onesignal.com/) to our malibu app.

OneSignal is a popular push notification service for websites and mobile apps. Commonly, publishers use OneSignal to send notifications of breaking news to the consumers of the website.

We first start by adding the respective details about OneSignal in the publisher config that will be needed by the OneSignal script and also will add one toggle which will enable or disable OneSignal from app.

1. Update your *config/publisher.yml* to add configuration related to OneSignal.

```yaml
publisher :
  onesignal:
    safari_web_id: ""
    is_enable: true
```
## OneSignal configure with Bold

2. Add OneSignal app id in [Bold integration](https://malibu.staging.quintype.com/settings/integrations)

![One signal integration]({{"images/onesignal.png" | absolute_url}})

## Registering The OneSignal ServiceWorker

3. Push notifications work via ServiceWorker. In order to register the service worker script, we need to add the functionality to our */client/app.js*.

```javascript
if (window.OneSignal) {
  Object.assign(opts, {
    serviceWorkerLocation: "/OneSignalSDKWorker.js" // OneSignal will automatically register the service worker
  });
}
```

4. In order to enable one signal service worker we need to pass *oneSignalServiceWorkers* in isomorphicRoutes of *app/server/app.js* file.

```javascript
...
isomorphicRoutes(app, {
  ...
  oneSignalServiceWorkers: true
  ...
});
```

Congratulations, we are all done. The next time a user comes to your app, they should get a prompt asking if they'd like to receive push notifications.

You can disable onesignal push notification by setting *is_enable:false* in the *config/publisher.yml* config file and disbale the *oneSignalServiceWorkers* from *isomorphicRoutes()* function.

You may now proceed back to the list of [Gumlet Integration]({{"/gumlet-integration" | absolute_url}}).
