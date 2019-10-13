---
title: OneSignal Integration
parent: Malibu Tutorial
nav_order: 08
---

# {{page.title}}

In this tutorial, we will learn how to intergrate [OneSignal](https://onesignal.com/) to our malibu app.

OneSignal is a push notification service for websites and mobile apps. We use OneSignal to send notifications of breaking news to the consumers of the website.

We first start by adding the respective details about OneSignal in the publisher config that will be needed by the OneSignal script

`config/publisher.yml` should look something like this.

```yaml
publisher :
  onesignal:
    app_id: "some_uuid"
    safari_web_id: ""
    tag_name: "publisher-breaking-news"
```

Now that we have the onesignal details in publisher yml files, we need to get it into our app.

In `app/server/handlers/render-layout.js`,

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

In our views, we create a following file in `views/pages/partials` called `onesignal.ejs` and add the following script.

```html
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
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

The above file is a partial file, which includes the oneSignal script along with the data in respective place in the script as mentioned in the `publisher/config.yml`.

The above file then has to be included in the main `layout.ejs` file.

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
