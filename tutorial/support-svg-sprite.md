---
title: Support SVG's in JS
nav_order: 19
parent: Malibu Tutorial
---

# {{page.title}}

This tutorial was contributed by [Athira](https://www.linkedin.com/in/athira-m-r-835ab6105)

In this chapter, we are going to discuss how to use `SVGs in JS` without causing an impact on performance.

## What is SVG's in JS?

Like HTML, SVGs are represented using the [Document Object Model](https://en.wikipedia.org/wiki/Document_Object_Model "Document Object Model") (DOM) and so can be manipulated with Javascript relatively easily. 
### Problem
There are SVG's embedded in JS for icons / logos / etc. These cause an impact on performance because:
- The size of the JS increases with additions and entail cost over the network.
- Render blocking.
- Downloaded JS is parsed affecting FCP & FMP.

### Solution
SVG's should be made external via webpack / plugins to load them lazy via a network call or DOM reference. Thus we are using `SVG sprite loader` (Webpack loader for creating SVG sprites). 

## Why SVG sprite loader?
SVG Sprites are rendered and injected in pages automatically, you just refer to images via `<svg><use xlink:href="#id"></use></svg>`. Also it can render sprites on server or in browser manually.  

## Set up [SVG sprite loader](https://www.npmjs.com/package/svg-sprite-loader "SVG sprite loader") for your app

**Note:** Currently this feature is available in Malibu. Please follow the below steps if your app is cloned from Malibu before 25th June 2021. 

There are few steps you need to follow to set up SVG sprite loader:

1. The first thing you need to install the package `npm install svg-sprite-loader -D`.
2. Go to `webpack.config.js` and modify the webpack config to support svg-sprite-loader.

```javascript
const webpackConfig = require("@quintype/build/config/webpack");
const path = require("path");

const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const svgSprite = {
  test: /\.svg$/,
  loader: "svg-sprite-loader",
  options: {
    extract: true,
    publicPath: "/",
    symbolId: filePath => {
      return path
        .basename(filePath)
        .replace(".svg", "")
        .toLowerCase();
    },
    spriteFilename: "sprite.svg",
    esModule: false
  }
};

webpackConfig.module.rules.push(svgSprite);
webpackConfig.module.rules.find(rule => rule.loader === "file-loader").exclude = [/app\/assets\/icons\/[a-z-]+\.svg$/];

const svgPlugin = () =>
  new SpriteLoaderPlugin({
    plainSprite: true
  });

webpackConfig.plugins.push(svgPlugin());

module.exports = {
  ...webpackConfig
};

```
Once you compile(build) the webpack, `sprite.svg` will be generated and available in the public folder.

3 .  Runtime configuration 
When you require an image, the loader transforms it to SVG <symbol>, adds it to the special sprite storage and returns class instance that represents symbol. It contains id, viewBox and content (id, viewBox and url in extract mode) fields and can later be used for referencing the sprite image.

 - Add all the svg icons inside `/assets/icons/` folder.

-  Go to `load-data.js` file and pass the webpack generated sprite.svg's path name as a part of config.

```javascript
...
import { assetFiles as getAssetFiles } from "@quintype/framework/server/asset-helper";
...

const svgSpritePath = Array.from(getAssetFiles()).find(asset => asset.includes("sprite"));
...
...
config: Object.assign(pick(config.asJson(), WHITELIST_CONFIG_KEYS), {
  ...
  svgSpritePath
})
...
...      
```

- Now create a `SvgIconHandler` component, for that create a new folder inside `atom`.
Example: `malibu/app/isomorphic/components/atoms/svg-icon-hadler/index.js`
 
```javascript
import React from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { string, object } from "prop-types";

if (require.context) { //  webpack's compiler that allows you to get all matching modules starting from some base directory
  const req = require.context("../../../../assets/icons/", true, /\.svg$/); //dynamically importing all the svg icons.
  req.keys().forEach(filename => req(filename));
}

export const SvgIconHandler = ({
  type,
  className = "",
  iconStyle = {},
  width = "16",
  height = "16",
  viewBox = "0 0 16 16"
}) => {
  const svgSpritePath = useSelector(state => get(state, ["qt", "config", "svgSpritePath"], "")); //  get the webpack generated sprite path.

  return (
    <svg className={className} style={iconStyle} width={width} height={height} viewBox={viewBox}>
      <use href={`${svgSpritePath}#${String(type).toLowerCase()}`} />
    </svg>
  );
};

```

`SvgIconHandler` component will accept  `type, className, iconStyle, width, height and viewBox` as props. The prop `type` will be the required SVG icon name. 

Example:
```javascript
<SvgIconHandler type="user" width="24px" height="24px" viewBox="0 0 24 24" iconStyle={{ color: "#000" }} />
```

**Note:** In the above example, the `user.svg` icon should be available in `/assets/icons/` folder.