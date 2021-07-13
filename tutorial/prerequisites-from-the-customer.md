---
title: Prerequisites from the customer
nav_order: 21
parent: Malibu Tutorial
---

# {{page.title}}

*This tutorial was contributed by [Anagh P](https://www.linkedin.com/in/anaghp/) and [Shraddha Kesari](https://www.linkedin.com/in/shraddha-k-3a3548161/)*

To enable third-party integrations such as  Google Auth, Facebook Auth, etc., the relevant IDs and secret keys will have to be shared with [Quintype](mailto:support@quintype.com) so that the same can be added to the DB and integrations such as OneSignal, GA, GTM, etc., the relevant IDs and secret keys need to be added in the [Black Knight](https://developers.quintype.com/malibu/tutorial/deploying-with-black-knight.html "black-knight") config 

## Enable Force Update feature for mobile apps

When you go live with Bold, your websites and mobile apps will have to fetch data using our APIs. This is easy when it comes to websites as any update made to it will be easily available to anyone visiting the URL. However, the same is not true for mobile apps. When you make the switch to Bold and the contents are written on Bold, the users of your mobile apps will stop receiving latest content as they are linked to your old system. This would mean that you have to either

1. Build and release a new app and remove the old app from App Store/Play Store. This side effect of this is that you will lose all your existing users until they manually download the new app from the store.
2. Update the existing app so that it’s compatible with the Quintype suite of products (Recommended). While this seems like a straightforward option, there is a catch here. Not all of your users will update to a new version of your app as soon as it’s released. Which means that they will either stop seeing latest content or the app will crash if you shut down your old system. To avoid this, we have to force the users to update their apps when we switch to Bold. This is possible if your app already has the force update feature enabled on it. If it is not, then you need to release a new version of your app as soon as possible with the force update feature enabled in it. For example, if you are planning to go live with your updated mobile app powered by Bold in December, you need to release a new version of your current app with force update feature enabled at least by September so that there are at least 3 months for your existing users to update their app. Please read more about force update. [Ref 1](https://betterprogramming.pub/force-update-your-apps-74de57523650 "Ref 1"), [Ref 2](https://techcrunch.com/2019/05/07/android-developers-can-now-force-app-updates/ "Ref 2"),  [Ref 3](https://medium.com/@sembozdemir/force-your-users-to-update-your-app-with-using-firebase-33f1e0bcec5a "Ref 3")

## Third-Party Integrations

Malibu Advanced supports third-party integrations such as GA, GTM, DFP, push notification services like OneSignal and social logins like Google, Facebook, Apple etc, which are optional. Those are given below. 

### Google Analytics (GA)

[Setup](https://developers.google.com/web/ilt/pwa/integrating-analytics) the analytics account and get the `tracking ID`. Your tracking ID looks like `UA-XXXXXXXX-Y`.  

### Google Tag Manager(GTM)

[Setup](https://support.google.com/tagmanager/answer/6103696?hl=en "Setup") the tag manager account and find the container ID, formatted as "GTM-XXXXXX".

### DoubleClick for Publishers (DFP) 

1. DFP Network ID
   Setup [Google Ad Manager](https://support.google.com/admanager/topic/7505789 "Google Ad Manager") account for your site and get the `Network code`. Your network code is a unique, numeric identifier for your Ad Manager network.
2. Set up the required slots and get the Ad units.

### OneSignal 

To enable and register OneSignal service on your website, please go through this [documentation](https://documentation.onesignal.com/docs/web-push-typical-setup "OneSignal ") and for registering on safari go through [this](https://documentation.onesignal.com/docs/safari-web-push-setup "set up with Safari") as well. The Safari Web ID looks like this `web.onesignal.auto.3c5e9739-5d2f-4f69-94b2-78aed3043174`. We need to add the Safari Web ID in Black Knight config. To send push notifications from Bold, update the relevant information in the Bold settings `settings-> integrations->OneSignal`

![Malibu Running]({{"images/onesignal-integration.png" | absolute_url}})

Get the `App Key` and `App ID` from your OneSignal dashboard.

### Social Logins

Your website might require user registration and login for numerous reasons. For example, you might want to send custom newsletters or show paid content. Quintype provides an in-house authentication service called Bridgekeeper for seamless integration across our suite of products. To make development easier, we have also released the Bridgekeeper JS library. To see it in action, refer to Malibu Advanced where the entire flow is built in.

**Google Login**

Configure google project for your application [here](https://console.developers.google.com/apis/dashboard "here") and get the `client-id` and `client-secret` also add `http://<your-domain>/api/auth/v1/google/callback` to Authorized redirect URIs.

```
client-id: "CLIENT-ID",
callback-url: "http://<your-domain>/api/auth/v1/google/callback",
client-secret: "CLIENT-SECRET",
login-failure-redirect-url: "http://<your-domain>/<failure-redirect-path>"

```

**Facebook Login**

 Create an account in [Facebook Developer](https://developers.facebook.com/ "Facebook Developer") and create new app for your site. Get the `client-id` and `client-secret` from the dashboard. Also add http://<your-domain>/api/auth/v1/facebook/callback to Authorized redirect URIs.

```
client-id: "CLIENT-ID",
allback-url: "http://<your-domain>/api/auth/v1/facebook/callback",
client-secret: "CLIENT-SECRET",
login-failure-redirect-url: "http://<your-domain>/<failure-redirect-path>"

```

**Apple Login**

Configure Apple app id, service id and keys for your application [here](https://developer.apple.com/account/resources/identifiers/list "here"). You can refer to this [page ](https://developer.okta.com/blog/2019/06/04/what-the-heck-is-sign-in-with-apple "page ")for creating the same. Also Add https://<your-domain>/api/auth/v1/apple/callback and <your-domain> as redirect URL and domain respectively to the service created in Apple developer account.

```
key-id: "APPLE-PRIVATE-KEY-ID",
team-id: "APPLE-TEAM-ID",
client-id: "APPLE-CLIENT-ID",
callback-url: "https://<your-domain>/api/auth/v1/apple/callback",
private-key-string: "-----BEGIN PRIVATE KEY-----\n<PRIVATE KEY>\n-----END PRIVATE KEY-----",
login-failure-redirect-url: "https://<your-domain>/<failure-redirect-path>"

```

We need to add all these credentials to our Bridgekeeper's realm table. For that please contact to Quintype [support team](mailto:support@quintype.com)