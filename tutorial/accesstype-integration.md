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
1. Then go to app>isomorphic>components>layouts>header>nav-bar>index.js and add a Link element with href=”/subscription”
1. This will take us to the subscription page which we have created in the previous step.

## Showing all the subscription groups

- Here, We have to fetch the subscriptions that are added in the accesstype dashboard.

- Create a separate component for displaying all the subscription groups.

- We have created different layout modals in the above component and we are using the setActiveTab function to change the modals.

- Get the details like user login status, accesstype key, accesstype bk integration id from the publisher attributes
- Initiate the Accesstype Components with all the necessary props and pass a subscriptionLayout component as a child

```jsx title="app/isomorphic/components/pages/subscription-page/index.js"
import get from "lodash/get";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { func, object } from "prop-types";
import { AccessType } from "@quintype/components";
import AccountModal from "../../login/AccountModal";
import { GroupsAndPlansModal, LoginModal, CheckoutModal } from "./Modals";

import "./subscription-page.m.css";

const SubscriptionLayout = ({
  initAccessType,
  initRazorPayPayment,
  getSubscription,
  validateCoupon,
  member,
}) => {
  const [activeTab, setActiveTab] = useState("subscription");
  const [selectedPlan, setSelectedPlan] = useState({});

  useEffect(() => {
    !global.AccessType && initAccessType();
  }, []);

  switch (activeTab) {
    case "subscription":
      return (
        <GroupsAndPlansModal
          member={member}
          setActiveTab={setActiveTab}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          getSubscription={getSubscription}
        />
      );

    case "login":
      return (
        <LoginModal
          setActiveTab={setActiveTab}
          AccountModal={AccountModal}
          selectedPlan={selectedPlan}
        />
      );

    case "checkout":
      return (
        <CheckoutModal
          member={member}
          setActiveTab={setActiveTab}
          initRazorPayPayment={initRazorPayPayment}
          selectedPlan={selectedPlan}
          validateCoupon={validateCoupon}
        />
      );

    default:
      return (
        <GroupsAndPlansModal
          member={member}
          setActiveTab={setActiveTab}
          getSubscription={getSubscription}
        />
      );
  }
};

SubscriptionLayout.propTypes = {
  initAccessType: func,
  initRazorPayPayment: func,
  getSubscription: func,
  validateCoupon: func,
  member: object,
};

export const SubscriptionPage = () => {
  const member = useSelector((state) => get(state, ["member"], null));
  const email = get(member, ["email"], "");
  const phone = get(member, ["metadata", "phone-number"], "");
  const { key, accessTypeBkIntegrationId } = useSelector((state) =>
    get(state, ["qt", "config", "publisher-attributes", "accesstypeConfig"], {})
  );

  return (
    <>
      <AccessType
        enableAccesstype={true}
        isStaging={true}
        accessTypeKey={key}
        email={email}
        phone={phone}
        accessTypeBkIntegrationId={accessTypeBkIntegrationId}
      >
        {({
          initAccessType,
          initRazorPayPayment,
          getSubscription,
          validateCoupon,
        }) => (
          <SubscriptionLayout
            initAccessType={initAccessType}
            initRazorPayPayment={initRazorPayPayment}
            getSubscription={getSubscription}
            validateCoupon={validateCoupon}
            member={member}
          />
        )}
      </AccessType>
    </>
  );
};
```

- Let’s get into the details of each of the modals created in the subscriptionLayout component.

### Login Modal:

- This modal is shown to anonymous users. In this modal we will show the account modal along with the plan selected

```jsx title="app/isomorphic/components/pages/subscription-page/Modals/LoginModal/index.js"
import React, { useState } from "react";
import { func, object } from "prop-types";

import "./login-modal.m.css";

const currencyLabels = {
  INR: "Rs.",
};

export const LoginModal = ({ setActiveTab, AccountModal, selectedPlan }) => {
  const [showAccountModal, setShowAccountModal] = useState(true);

  const { plan } = selectedPlan;
  return (
    <div styleName="modal">
      <div styleName="checkout-label">Checkout</div>
      <div styleName="secure">100% secure</div>
      <div styleName="current-step">Step 1 of 2</div>
      <div styleName="login-modal">
        {showAccountModal && (
          <AccountModal
            isPopup={false}
            customCallbackUrl={global.location.href}
            onClose={() => {
              setShowAccountModal(false);
              setActiveTab("checkout");
            }}
          />
        )}
      </div>
      <div styleName="plan-preview">
        <div styleName="label">Plan Details</div>
        <div styleName="plan-details">
          <div styleName="plan-name-and-price">
            <div styleName="group-plan-name">{`${plan.title} - ${
              plan.recurring ? "Recurring Plan" : "One Time Plan"
            }`}</div>
            <div styleName="price">{`${currencyLabels[plan.price_currency]} ${
              plan.price_cents / 100
            }/-`}</div>
          </div>
        </div>
        <div styleName="validity">{`Valid for ${plan.duration_length} ${
          plan.duration_length === 1
            ? plan.duration_unit.substring(0, plan.duration_unit.length - 1)
            : plan.duration_unit
        }`}</div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  setActiveTab: func,
  AccountModal: func,
  selectedPlan: object,
};
```

### Checkout Modal:

- In this modal we will show the plan details, coupon code and the payment option

```jsx title="app/isomorphic/components/pages/subscription-page/Modals/CheckoutModal/index.js"
import React, { useState } from "react";
import { func, object } from "prop-types";

import "./checkout-modal.m.css";

const currencyLabels = {
  INR: "Rs.",
};

export const CheckoutModal = ({
  member,
  setActiveTab,
  initRazorPayPayment,
  selectedPlan,
  validateCoupon,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [showCouponCode, setShowCouponCode] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState("");
  const [plan, setPlan] = useState(selectedPlan.plan);

  return (
    <div styleName="modal">
      <div styleName="checkout-label">Checkout</div>
      <div styleName="secure">100% secure</div>
      <div styleName="current-step">Step 1 of 2</div>
      {member && (
        <div styleName="change-account">
          <div styleName="label">Account</div>
          <span>{member.name}</span>
          <span styleName="not-you-btn" onClick={() => setActiveTab("login")}>
            Not you?
          </span>
        </div>
      )}
      <div styleName="checkout-container">
        <div>
          <div styleName="label">Plan Details</div>
          <div styleName="plan-preview">
            <div styleName="plan-name-and-price">
              <div styleName="group-plan-name">{`${plan.title} - ${
                plan.recurring ? "Recurring Plan" : "One Time Plan"
              }`}</div>
              <div styleName="price">{`${currencyLabels[plan.price_currency]} ${
                plan.price_cents / 100
              }/-`}</div>
            </div>
          </div>
          <div styleName="validity">{`Valid for ${plan.duration_length} ${
            plan.duration_length === 1
              ? plan.duration_unit.substring(0, plan.duration_unit.length - 1)
              : plan.duration_unit
          }`}</div>
          <div styleName="plan-and-coupon-btns">
            <div
              styleName="change-plan-btn"
              onClick={() => setActiveTab("subscription")}
            >
              Change Plan
            </div>
            {!showCouponCode && (
              <div
                styleName="add-coupon-code-btn"
                onClick={() => setShowCouponCode(true)}
              >
                Add Coupon Code
              </div>
            )}
          </div>
          {showCouponCode && (
            <div>
              <div styleName="coupon-code-label">Coupon code</div>
              <div styleName="coupon-apply">
                <input
                  styleName="coupon-code-input"
                  value={couponCode}
                  type="text"
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <div
                  onClick={() => {
                    validateCoupon(plan.id, couponCode)
                      .then((res) => {
                        if (res.valid) {
                          const updatedPlan = { ...plan };
                          updatedPlan.coupon_code = couponCode;
                          updatedPlan.discounted_price_cents =
                            res.discount_details.discounted_price_cents;
                          updatedPlan.coupon_discount =
                            res.discount_details.value;
                          setIsCouponApplied("applied");
                          setPlan(updatedPlan);
                        } else {
                          setIsCouponApplied("failed");
                        }
                      })
                      .catch((err) =>
                        console.error(`Coupon code error: ${err}`)
                      );
                  }}
                  styleName="apply-coupon-btn"
                >
                  Apply
                </div>
              </div>
            </div>
          )}
          {isCouponApplied === "applied" && (
            <div styleName="amount-saved">{`You saved ${
              currencyLabels[plan.price_currency]
            } ${
              (plan.price_cents - plan.discounted_price_cents) / 100
            }/-`}</div>
          )}
          {isCouponApplied === "failed" && (
            <div styleName="coupon-error">This coupon code is invalid</div>
          )}
        </div>
        <div styleName="total-payment">
          <div styleName="label">To Pay</div>
          <div styleName="price">{`${currencyLabels[plan.price_currency]} ${
            plan.discounted_price_cents !== undefined
              ? plan.discounted_price_cents / 100
              : plan.price_cents / 100
          }/-`}</div>
        </div>
        <div>
          <div styleName="label">Payment Method</div>
          <input
            type={"radio"}
            id={"credit-debit-cards"}
            value={"razorpay"}
            checked
          />
          <label styleName="radio-label" htmlFor="credit-debit-cards">
            Credit/Debit Cards, UPI
          </label>
          <button
            styleName="proceed-to-payment-btn"
            onClick={async () => {
              const updatedPlan = JSON.parse(JSON.stringify(plan));
              updatedPlan.coupon_code = couponCode;
              const paymentResponse =
                updatedPlan.discounted_price_cents === 0 ||
                updatedPlan.price_cents === 0
                  ? await initRazorPayPayment(
                      updatedPlan,
                      "standard",
                      "",
                      "",
                      "",
                      "skip_payment_gateway"
                    )
                  : await initRazorPayPayment(updatedPlan, "standard");
              if (paymentResponse.subscription) {
                window.location.href = "/profile";
              }
            }}
          >
            {`Proceed to Pay ${currencyLabels[plan.price_currency]} ${
              plan.discounted_price_cents !== undefined
                ? plan.discounted_price_cents / 100
                : plan.price_cents / 100
            }/-`}
          </button>
        </div>
      </div>
    </div>
  );
};

CheckoutModal.propTypes = {
  member: object,
  setActiveTab: func,
  initRazorPayPayment: func,
  selectedPlan: object,
  validateCoupon: func,
};
```

- In the above component we have implemented all the checkout and payment related logic like adding coupon codes, calculating the final price of the subscription when there is a discount, making payment requests to razorpay.
- Razorpay responds with failure or success messages depending on the status of the payment, if the payment is successful it redirects to the profile page. You can modify this if you want to redirect to some other route.

### Adding Subscriptions to user profile

- Accesstype provides an api to check if the users’ active subscriptions and expired subscriptions. We will use that to show all the active and expired subscriptions of the user
- To implement this go to app/isomorphic/components/pages/profile-page/index.js and wrap it with the accesstype component and fetch active and expired subscriptions like given below

```jsx title="app/isomorphic/components/pages/profile-page/index.js"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import { AccessType } from "@quintype/components";
import { ProfilePageWithAccesstype } from "./ProfilePageWithAccesstype";

import "./profile-page.m.css";

const ProfilePage = () => {
  const [isATGlobal, setIsATGlobal] = useState(false);
  const member = useSelector((state) => get(state, ["member"], null));
  const email = get(member, ["email"], "");
  const phone = get(member, ["metadata", "phone-number"], "");
  const { key, accessTypeBkIntegrationId } = useSelector((state) =>
    get(state, ["qt", "config", "publisher-attributes", "accesstypeConfig"], {})
  );

  return (
    <AccessType
      enableAccesstype={true}
      isStaging={true}
      accessTypeKey={key}
      email={email}
      phone={phone}
      accessTypeBkIntegrationId={accessTypeBkIntegrationId}
      onATGlobalSet={() => {
        setIsATGlobal(true);
      }}
    >
      {({ initAccessType, getSubscriptionForUser, cancelSubscription }) => (
        <ProfilePageWithAccesstype
          member={member}
          getSubscriptionForUser={getSubscriptionForUser}
          cancelSubscription={cancelSubscription}
          isATGlobal={isATGlobal}
          initAccessType={initAccessType}
        />
      )}
    </AccessType>
  );
};

export { ProfilePage };
```

- In this component we show all the active and expired subscriptions, and the user will be given an option to cancel the active subscription as well.

## Adding a paywall in story pages

- Wrap the story page inside accesstype component so that story page can access all the accesstype related methods
- Paywall will be shown only when the story has a subscription access and the user is not subscribed.

```jsx
import React, { useEffect, useState } from "react";
import {
  AccessType,
  InfiniteStoryBase,
  WithPreview,
} from "@quintype/components";
import { object, shape } from "prop-types";

import StoryWrapper from "../story-templates/story-wrapper";
import { useSelector } from "react-redux";
import get from "lodash/get";

function StoryPageBaseWithAccesstype({ story, config }) {
  const [isATGlobal, setIsATGlobal] = useState(false);
  const member = useSelector((state) => get(state, ["member"], null));
  const email = get(member, ["email"], "");
  const phone = get(member, ["metadata", "phone-number"], "");
  const { key, accessTypeBkIntegrationId } = useSelector((state) =>
    get(state, ["qt", "config", "publisher-attributes", "accesstypeConfig"], {})
  );

  return (
    <AccessType
      enableAccesstype={true}
      isStaging={true}
      accessTypeKey={key}
      email={email}
      phone={phone}
      accessTypeBkIntegrationId={accessTypeBkIntegrationId}
      onATGlobalSet={() => {
        setIsATGlobal(true);
      }}
    >
      {({ initAccessType, checkAccess }) => (
        <StoryWrapper
          isATGlobal={isATGlobal}
          story={story}
          config={config}
          initAccessType={initAccessType}
          checkAccess={checkAccess}
        />
      )}
    </AccessType>
  );
}
```

- Add this checkAccess api call in a useEffect inside the story-wrapper.js file to know whether the user has access or not.

```jsx
useEffect(() => {
  initAccessType(() => {
    checkAccess(story.id).then((res) => {
      const { granted } = res[story.id];
      setHasAccess(granted);
    });
  });
}, [isATGlobal]);
```

- Pass this value as a prop down to all the children for all story templates and use it in the StoryData component.

```jsx
const isStoryBehindPaywall =
  story.access === "subscription" && hasAccess === false;

return isStoryBehindPaywall ? (
  <>
    <StoryElementCard
      story={story}
      card={visibleCards[0]}
      key={get(visibleCards[0], ["id"], "")}
      config={storyElementsConfig}
      isLive
      theme={theme}
      adComponent={adComponent}
      widgetComp={widgetComp}
    />
    <Paywall />
  </>
) : (
  ...
);
```

## Enabling subscription and metering paywall features for amp stories

- Go to app/server/app.js and pass the below object to the ampRoutes function

```jsx
ampRoutes(app, {
  featureConfig: {
    subscriptions: {
      services: {
        authorizationUrl: ({ story, config }) => {
          const { key, accessTypeBkIntegrationId } =
            config.additionalConfig.publisher.accesstypeConfig;
          return `https://malibu-advanced-web.qtstage.io/api/access/v1/stories/${story["story-content-id"]}/amp-access?key=${key}&accesstype_integration_id=${accessTypeBkIntegrationId}&rid=READER_ID&url=SOURCE_URL`;
        },
        pingbackUrl: ({ story, config }) => {
          const { key, accessTypeBkIntegrationId } =
            config.additionalConfig.publisher.accesstypeConfig;
          return `https://malibu-advanced-web.qtstage.io/api/access/v1/stories/${story["story-content-id"]}/amp-access?key=${key}&accesstype_integration_id=${accessTypeBkIntegrationId}&rid=READER_ID&url=SOURCE_URL`;
        },
        actions: {
          login: () => "https://malibu-advanced-web.qtstage.io/user-login",
          subscribe: () =>
            "https://malibu-advanced-web.qtstage.io/subscription",
        },
      },
      score: { supportsViewer: 10, isReadyToPay: 9 },
      fallbackEntitlement: {
        granted: () => false,
        grantReason: () => "SUBSCRIBER",
        data: {
          isLoggedIn: () => false,
        },
      },
    },
  },
});
```
