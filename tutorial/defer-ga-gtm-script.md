---
title: Defer GA and GTM script
parent: Malibu Tutorial
nav_order: 28
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Harshith](https://www.linkedin.com/in/harshith-raj-092ba4176)_

We have noticed `GA` and `GTM` scripts having a negative impact on page scores. So we came into providing a toggle to deferring these scripts for a set interval. 

How Quintype handles deferring `GA` and `GTM` scripts for a set interval?

- If defer of `GA` and `GTM` scripts are enabled, we will be loading the scripts after a specified interval on the client-side

1. Create two separate functions, one for loading the `GA` script
Eg: (`app/isomorphic/components/ga-script-generator.js`)

    ```javascript
    import get from "lodash/get";
    import { useSelector } from "react-redux";

    export const gaScriptGenerator = () => {
      const scriptDelay = parseInt(
        useSelector(state => get(state, ["qt", "config", "publisher-attributes", "google_analytics", "script_delay"]))
      );
      const gaId = useSelector(state => get(state, ["qt", "config", "publisher-attributes", "google_analytics", "id"]));

      const timeout = setTimeout(function() {
        const script = document.createElement("script");
        script.src = "https://www.google-analytics.com/analytics.js";
        const node = document.getElementsByTagName("script")[0];
        node.parentNode.insertBefore(script, node);

        window.ga =
          window.ga ||
          function() {
            (ga.q = ga.q || []).push(arguments);
          };
        ga.l = +new Date();
        ga("create", gaId, "auto");
        ga("send", "pageview");
        clearTimeout(timeout);
      }, scriptDelay * 1000);

      return null;
    };
    ```

    and another to generate `GTM` script

    Eg: (`/Users/harshithraj/quintype/malibu-advanced/app/isomorphic/components/gtm-script-generator.js`)

    ```javascript
    import get from "lodash/get";
    import { useSelector } from "react-redux";

    export const gtmScriptGenerator = () => {
      const scriptDelay = parseInt(
        useSelector(state => get(state, ["qt", "config", "publisher-attributes", "google_tag_manager", "script_delay"]))
      );

      const gtmId = useSelector(state => get(state, ["qt", "config", "publisher-attributes", "google_tag_manager", "id"]));

      const timeout = setTimeout(function() {
        (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
          });
          var f = d.getElementsByTagName(s)[0];
          var j = d.createElement(s);
          var dl = l !== "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", gtmId);
        clearTimeout(timeout);
      }, scriptDelay * 1000);

      return null;
    };
    ```
2. In `app/client/render.js`, call the above functions with a particular Id(which will be used to trigger the function) inside the `renderApplication` function.

    Eg:

    ```javascript
    export function renderApplication(store) {
      ...
      ...
      const gtmScriptDelay = parseInt(
        get(store.getState(), ["qt", "config", "publisher-attributes", "google_tag_manager", "script_delay"])
      );
      const gaScriptDelay = parseInt(
        get(store.getState(), ["qt", "config", "publisher-attributes", "google_analytics", "script_delay"])
      );

      ...
      ...
      gtmScriptDelay && renderComponent(gtmScriptGenerator, "gtm-script-generator", store);
      gaScriptDelay && renderComponent(gaScriptGenerator, "ga-script-generator", store);
      ...
      ...
    }
    ```
    In the above example, we are checking if there is a valid delay value to execute the script delay.

3. In `views/pages/layout.ejs`, check if there is a valid delay value then create a `div` tag with the same `ID` used above

    Eg:
    ```javascript
    <div id='gtm-script-generator'></div>
    <div id='ga-script-generator'></div>
    ```
- If your app is cloned from `malibu-advanced`, pass `script_delay` under `google_tag_manager` and `google_analytics` with required delay in seconds from `/app/config/publisher.yml` in `black knight` under `publisher`, which accepts an integer value.

  Note:
- If this value is not defined or if it is zero it fallbacks to rendering the script on the initial page load and affect the page scores
- Make sure you're not providing higher delay, as this affects monitoring and other functionalities of `GA` and `GTM`.
