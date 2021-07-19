---
title: Custom Assets
nav_order: 16
parent: Malibu Tutorial
---

# {{page.title}}

*This tutorial was contributed by [Deo](https://www.linkedin.com/in/deo-kumar) and [Phaneendra](https://www.linkedin.com/in/venkata-phaneendra-andukuri)*

## Custom assets
 Malibu supports custom/static assets like fonts, images, icons, etc. We will follow the below steps for loading custom fonts in Malibu.

## Steps to implement the custom fonts

1. Create `static-assets` folder inside app. Ex: `app/static-assets`.

![Static assets]({{"images/static-assets.png" | absolute_url}})

2. ut all the fonts inside the above folder or you can create a separate folder for the fonts and put it inside the static-assets folder. Ex: `app/static-assets/fonts`.

3. Now open `app/server/handlers/render-layout.js` and use your fonts as shown below:

```javascript
...
import { assetPath } from "@quintype/framework/server/asset-helper";

const shurjo700eot = assetPath("ShurjoWeb_700_v2.eot"); //example of ShurjoWeb_700_v2 fonts

res.render(
      "pages/layout",
      Object.assign(
        {
         ....
          shurjo700woff: shurjo700woff,
         ...
        }
      )
    )
...
```
4. And the final step is to use the above custom fonts in `/layout.ejs` file.

```javascript
...
 @font-face {
          font-family: "Shurjo";
          font-display: swap;
          font-weight: 700; 
          font-style: normal;
          src: url(<%= shurjo700Woff %>) format('woff'),
        }
...
```
The expected fonts should be applied in the app now. The same implementation can be replicated for other assets.

**Note** - If you are putting HD `images/icons` inside `static-assets` folder, they may cause an increase in the quay build time.

You may now proceed to [Third Party Integrations]({{"/tutorial/third-party-integrations.html" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
