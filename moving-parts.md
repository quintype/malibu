---
title: Moving Parts
permalink: /moving-parts
---
# {{page.title}}

In this document, we explain some of the libraries that malibu is built on.

## React

React is the backbone of every product at Quintype, including the Malibu framework.

Pages are modelled as React components, and Malibu uses JSX and CSS modules.

Before getting started, it's strongly recommended that you go through [the React Tutorial](https://reactjs.org/tutorial/tutorial.html)

## @quintype/framework

The Quintype framework handles most of the heavy lifting in the application for you.

It handles a number of functionality, such as
* The isomorphic rendering
* Automatically forwarding things like amp pages upstream
* Following redirects that are set up in the editor

See the [tutoria]({{"/tutorial" | absolute_url}}) for more examples.

For more information, please see [@quintype/framework on github](https://github.com/quintype/quintype-node-framework) or [the documentation](https://developers.quintype.com/quintype-node-framework)

## @quintype/backend

The Quintype backend is an API client that provides methods to fetch various pieces of data. It is based on [request](https://www.npmjs.com/package/request). Most APIs will return a promise that resolves to an object.

This library will primarily be used in the [*loadData*]({{"/isomorphic-rendering" | absolute_url}}) function.

For more information, please see [@quintype/backend on github](https://github.com/quintype/quintype-node-backend) or [the documentation](https://developers.quintype.com/quintype-node-backend)

## @quintype/components

The Quintype components is a set of *view-less* components which can be used to quickly build out your app. These components provide core logic like infinite scroll and paywall, while allowing you to provide the views for the same.

For more information, please see [@quintype/components on github](https://github.com/quintype/quintype-node-components) or [the documentation](https://developers.quintype.com/quintype-node-components)

## @quintype/seo

The Quintype seo plugin handles most of the SEO tags that Quintype publishers usually add as a best practice. This includes
* Adding the AMP tags for story pages if enabled
* Ensuring Article / NewsArticle schemas are present if enabled
* Ensuring og images and other social sharing tags are present

See the [tutoria]({{"/tutorial" | absolute_url}}) for more examples.

For more information, please see [@quintype/seo on github](https://github.com/quintype/quintype-node-seo) or [the documentation](https://developers.quintype.com/quintype-node-seo)

## @quintype/build

The Quintype build plugin handles the ease of developement of Quintype plugins. It runs on your development machine, and during the building of the final image. This plugin is not deployed to production.

For more information, please see [@quintype/build on github](https://github.com/quintype/quintype-node-build) or [the documentation](https://developers.quintype.com/quintype-node-build)

## Metype

Metype is Quintype's engagement product. It provides a number of useful widgets such as a commenting widget, a trending content feed, page reactions, and many more.

Please see [https://www.metype.com](https://www.metype.com) or [contact support](mailto:support@quintype.com) for more information.

## AccessType

AccessType is Quintype's subscriptions and paywall product. It allows you to configure many purchasable plans, and set up pricing for each one. AccessType also allows you to set up a metered paywall, to allow some number of free articles each month, and to allow you to buy a single article.

Please see [https://www.accesstype.com](https://www.accesstype.com) or [contact support](mailto:support@quintype.com) for more information.

## Google Workbox

[Google Workbox](https://developers.google.com/web/tools/workbox/) is a tool for building ServiceWorkers for PWA.

## Redux

[Redux](https://redux.js.org) is a state management solution for javascript. *@quintype/framework* exposes multiple events and reducers for page navigation, but it is also possible to define your own reducers. For most publishers, this will be done behind the scenes and you will not need to work directly with redux.

## Node

[Node](https://nodejs.org) is a Javascript runtime built on Chrome's V8 engine. Malibu uses the latest node LTS release.

## Docker

[Docker](https://www.docker.com) is used by Quintype to containerize and deploy your application. It is usually not required that developers understand how Quintype uses docker internally.
