---
title: Integrating Accesstype with Malibu Advanced
nav_order: 32
parent: Malibu Tutorial
---

# {{page.title}}

_This tutorial was contributed by [Phaneendra Andukuri](https://www.linkedin.com/in/venkata-phaneendra-andukuri/)_

In this document we will understand how to integrate accesstype with malibu-advanced apps. Accesstype is a subscription and access management platform built by quintype.

## Accesstype Account Setup:

1. Create accesstype account: Go to <https://www.accesstype.com/dashboard> for prod instance or (<https://staging.accesstype.com> for staging) and login.
1. In the accesstype dashboard, go to settings > general, scroll down to see Account key inside Authentication Keys category. Keep this key handy for further use
1. Talk to quintype supports to create bridgekeeper-accesstype integration for your domain. They will give you an integration Id which we will use later.
1. Create a razorpay account and get api_key, secret from the razorpay dashboard and add them in accesstype dashboard > configure > payment gateways > razorpay and click save
   **Note**: Accesstype support other payment gateways also but for now We have integrated only razorpay payment gateway in malibu-advanced
1. Now that we have created an accesstype account and integrated it with razorpay payment gateway, we will now create some subscription groups in the dashboard.
1. Go to dashboard > group_and_plans > manage click on add subscriptions and add name, description and other details and click save.
1. Now you can configure other options like coupon codes in the dashboard > configure tab. Click on add coupon and add the name and discount value and click save.

Now that we are done with the accesstype account setup, let's add the access type config in the blackKnight config. For that, go to your blackKnight account > Config Files, in that edit your publisher.yml file and add the below snippet replacing your-accesstype-account-key bk-accesstype-integration-id with the actual values.

```yml "
accesstypeConfig:
  key: "<your-accesstype-account-key>"
  accessTypeBkIntegrationId: "<bk-accesstype-integration-id>"
```

We have all the setup done. We can now add the functionality and UI through our code but before that see this outline of what all we are going to do.

1. Creating a subscriptions page
1. Showing all the subscription groups
1. Showing Login modal with selected subscription plan for anonymous users
1. Showing Checkout modal for the logged in users
1. Making payment through Razorpay
1. Adding subscriptions to the user profile
1. Adding a paywall to the stories that cannot be accessible to the user
1. Enabling subscription and metering paywall features for amp stories

Now let's jump into the code. Open your app repository in the code editor.

## Creating a subscriptions page

1. Go through <https://developers.quintype.com/malibu/tutorial/creating-a-page.html> and create a new page for subscriptions with the route /subscription
1. Then go to app/isomorphic/components/layouts/header/nav-bar/index.js and add a Link element with href=”/subscription”
1. This will take us to the subscription page which we have created in the previous step.

## Showing all the subscription groups

- Here, We have to fetch the subscriptions that are added in the accesstype dashboard.

- Create a separate component for displaying all the subscription groups.

- We have created different layout modals in the above component and we are using the setActiveTab function to change the modals.

- Get the details like user login status, accesstype key, accesstype bk integration id from the publisher attributes
- Initiate the Accesstype Components with all the necessary props and pass a subscriptionLayout component as a child

You can go and check this code at [subscription-page](https://github.com/quintype/malibu-advanced/blob/master/app/isomorphic/components/pages/subscription-page/index.js)

- Let’s get into the details of each of the modals created in the subscriptionLayout component.

### Login Modal:

- This modal is shown to anonymous users. In this modal we will show the account modal along with the plan selected

You can go and check this code at [login-modal](https://github.com/quintype/malibu-advanced/blob/master/app/isomorphic/components/pages/subscription-page/Modals/LoginModal/index.js)

### Checkout Modal:

- In this modal we will show the plan details, coupon code and the payment option

You can go and check this code at [checkout-modal](https://github.com/quintype/malibu-advanced/blob/master/app/isomorphic/components/pages/subscription-page/Modals/CheckoutModal/index.js)

- In the above component we have implemented all the checkout and payment related logic like adding coupon codes, calculating the final price of the subscription when there is a discount, making payment requests to razorpay.
- Razorpay responds with failure or success messages depending on the status of the payment, if the payment is successful it redirects to the profile page. You can modify this if you want to redirect to some other route.

### Adding Subscriptions to user profile

- Accesstype provides an api to check if the users’ active subscriptions and expired subscriptions. We will use that to show all the active and expired subscriptions of the user
- To implement this go to app/isomorphic/components/pages/profile-page/index.js and wrap it with the accesstype component and fetch active and expired subscriptions like given below

You can go and check this code at [profile-page](https://github.com/quintype/malibu-advanced/blob/master/app/isomorphic/components/pages/profile-page/index.js)

- In this component we show all the active and expired subscriptions, and the user will be given an option to cancel the active subscription as well.

## Adding a paywall in story pages

- Wrap the story page inside accesstype component so that story page can access all the accesstype related methods
- Paywall will be shown only when the story has a subscription access and the user is not subscribed.

You can go and check this code at [here](https://github.com/quintype/malibu-advanced/blob/master/app/isomorphic/components/pages/story.js)

- Add this checkAccess api call in a useEffect inside the story-wrapper.js file to know whether the user has access or not.

- Pass this value as a prop down to all the children for all story templates and use it in the StoryData component.

## Enabling subscription and metering paywall features for amp stories

- Go to app/server/app.js and pass the below object to the ampRoutes function

You can go and check this code at [here](https://github.com/quintype/malibu-advanced/blob/master/app/server/app.js)
