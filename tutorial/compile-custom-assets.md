---
title: Custom Assets
nav_order: 18
parent: Malibu Tutorial
---

# {{page.title}}

*This tutorial was contributed by [Deo](https://www.linkedin.com/in/deo-kumar) and [Phaneendra](https://www.linkedin.com/in/venkata-phaneendra-andukuri)*

## Custom assets
 Malibu support custom assets like fonts, images, icons, etc. We will follow the below steps for loading custom fonts in Malibu.

## Steps to implement the custom fonts

1. Create `static-assets` folder inside app. ex - `app/static-assets`.

![Static assets]({{"images/static-assets.png" | absolute_url}})

2. Put all the fonts inside the above folder or you can create a separate folder for the fonts and put it inside static-assets folder. ex - `app/static-assets/fonts`.

3. Now open `app/server/handlers/render-layout.js` and use your fonts.

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
That's all, your font should show on your app.

You can use other assets similar to fonts.

**Note** - If you are putting HD images/icons inside `static-assets` folder may cause a quay build delay. So make sure to put only low-quality images/icons or other custom assets.

You may now proceed to [Third Party Integrations]({{"/tutorial/third-party-integrations.html" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
