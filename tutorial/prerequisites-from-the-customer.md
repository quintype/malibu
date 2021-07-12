---
title: Prerequisites from the customer
nav_order: 21
parent: Malibu Tutorial
---

# {{page.title}}

*This tutorial was contributed by [Athira MR](https://www.linkedin.com/in/athira-m-r-835ab6105/) and [Shraddha Kesari](https://www.linkedin.com/in/shraddha-k-3a3548161/)*

In this tutorial, we will get to know the prerequisites needed from the client. 

## Enable Force Update feature for mobile apps
 
The client needs to enable the `Force Update` feature on their current mobile app. When an updated version is available, the older version will become unusable – that is, if users do not update the app, they do not enter the app. 


## Third-Party Integrations

Malibu advanced supports third-party integrations such as GA, GTM, DFP, push notification services like OneSignal and social logins like Google, Facebook, Apple etc, which are optional.  We need some prerequisites from the client for these integrations, those are given below. 

### Google Analytics (GA)

Setup[https://developers.google.com/web/ilt/pwa/integrating-analytics] the analytics account and get the `tracking ID`. Your tracking ID looks like `UA-XXXXXXXX-Y`.  

### Google Tag Manager(GTM)

[Setup](https://support.google.com/tagmanager/answer/6103696?hl=en "Setup") the tag manager account and find the container ID, formatted as "GTM-XXXXXX".

### DoubleClick for Publishers (DFP)

1. DFP Network ID
   Setup [Google Ad Manager](https://support.google.com/admanager/topic/7505789 "Google Ad Manager") account for your site and get the `Network code`. Your network code is a unique, numeric identifier for your Ad Manager network.
2. Set up the required slots and get the Ad units. 
   Example:  `Top Ad : "/5463099287/BannerAd"` `Story Page : "/5463099287/ScrollAdUnit"`

### OneSignal 

We can integrate OneSignal through our Bold instance. 
Setup [OneSignal ](https://documentation.onesignal.com/docs/web-push-typical-setup "OneSignal ")on your website and also [set up with Safari](https://documentation.onesignal.com/docs/safari-web-push-setup "set up with Safari"). The Safari Web ID looks like this `web.onesignal.auto.3c5e9739-5d2f-4f69-94b2-78aed3043174`. We need to add the Safari Web ID in our Black knight config. Now login to the Bold instance and go to `settings-> integrations->OneSignal` and fill the required fields. 

![Malibu Running]({{"images/onesignal-integration.png" | absolute_url}})

Get the `App Key` and `App ID` from your OneSignal dashboard.

### Social Logins

Malibu advanced supports `login` feature and the feature is optional. If this feature is needed, below mentioned prerequisites are to be shared with quintype [support team](mailto:support@quintype.com)

#### Google Login

Configure google project for your application [here](https://console.developers.google.com/apis/dashboard "here") and get the `client-id` and `client-secret` also add `http://<your-domain>/api/auth/v1/google/callback` to Authorized redirect URIs.

```javascript
"google": {
  "client-id": "CLIENT-ID",
  "callback-url": "http://<your-domain>/api/auth/v1/google/callback",
  "client-secret": "CLIENT-SECRET",
  "login-failure-redirect-url": "http://<your-domain>/<failure-redirect-path>"
}
```

#### Facebook Login

 Create an account in [Facebook Developer](https://developers.facebook.com/ "Facebook Developer") and create new app for your site. Get the `client-id` and `client-secret` from the dashboard. Also add http://<your-domain>/api/auth/v1/facebook/callback to Authorized redirect URIs.

```javascript
  "facebook": {
    "client-id": "CLIENT-ID",
    "callback-url": "http://<your-domain>/api/auth/v1/facebook/callback",
    "client-secret": "CLIENT-SECRET",
    "login-failure-redirect-url": "http://<your-domain>/<failure-redirect-path>"
  }
```

#### Apple Login

Configure Apple app id, service id and keys for your application [here](https://developer.apple.com/account/resources/identifiers/list "here"). You can refer to this [page ](https://developer.okta.com/blog/2019/06/04/what-the-heck-is-sign-in-with-apple "page ")for creating the same. Also Add https://<your-domain>/api/auth/v1/apple/callback and <your-domain> as redirect URL and domain respectively to the service created in Apple developer account.

```javascript
"apple": {
  "key-id": "APPLE-PRIVATE-KEY-ID",
  "team-id": "APPLE-TEAM-ID",
  "client-id": "APPLE-CLIENT-ID",
  "callback-url": "https://<your-domain>/api/auth/v1/apple/callback",
  "private-key-string": "-----BEGIN PRIVATE KEY-----\n<PRIVATE KEY>\n-----END PRIVATE KEY-----",
  "login-failure-redirect-url": "https://<your-domain>/<failure-redirect-path>"
}
```

We need to add all these credentials in our Bridgekeeper's realm table. For that please contact to our [support team](mailto:support@quintype.com)
