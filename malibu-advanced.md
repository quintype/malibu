---
title: Malibu Advanced
nav_order: 6
permalink: /malibu-advanced
---
# {{page.title}}

## Introduction

While Malibu provides a basic platform to build websites quickly, Malibu Advanced is an upgraded version with performance improvements and some of the third-party integrations commonly used by publishers. It is also integrated with our internal design library called Arrow which gives the look and feel of a fully functional website.

Malibu Advanced has the following add-ons over Malibu:

- **DFP Ads:** We’ve tried multiple approaches to integrate the DFP ads, each of them having its pros and cons. After numerous experiments, we landed on using vanilla JavaScript which provided us with the easiest implementation and customisation along with reasonably less impact on the Google Lighthouse scores. For detailed insights on the DFP integration, please check [here](https://developers.quintype.com/malibu/tutorial/dfp-ads.html).

- **OneSignal Integration:** While Bold supports multiple push notification services, we have integrated OneSignal on Malibu Advanced as an example. You can see the documentation [here](https://developers.quintype.com/malibu/tutorial/onesignal.html). If you want to use any other service, this can be used as a reference for implementation.

- **GA and GTM:** Malibu Advanced ships with GA and GTM out of the box. All you have to do to initialise it in your app is to add the corresponding IDs in the configuration file in black knight.

- **Arrow design library:** Please refer to the docs [here](https://developers.quintype.com/malibu/tutorial/arrow-integration-malibu-advanced.html) on the Arrow integration.
For detailed insights on what Arrow is, please check the [Arrow docs](https://developers.quintype.com/quintype-node-arrow/?path=/story/introduction--getting-started).


## Getting Started with Malibu Advanced:

**Prerequisites:**

https://developers.quintype.com/malibu/tutorial/getting-started.html#prerequisites

**Creating a new Malibu Advanced App:**

Quintype will create a clone of Malibu Advanced for you under Quintype’s Github account. You can raise a request for this by emailing <support@quintye.com>. Once you have access to this repository, you can clone it for development either using the [NPM package](https://www.npmjs.com/package/@quintype/create-malibu-app) or by manually cloning it.

**Using Docker on Windows:**

If you plan to use Docker on Windows, then please ensure that the Github repository has been cloned within your user’s home directory.

**Next steps:**

https://developers.quintype.com/malibu/tutorial/getting-started.html#running-the-app-locally
