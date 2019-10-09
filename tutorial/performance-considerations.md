---
title: Performance Considerations
parent: Malibu Tutorial
nav_order: 04
---

One of the most important things to consider is the performance of a website. These are the following things to consider while building a webpage using malibu.

## Optimizing images

Before getting in detail about optimizing images, it is recommended to go through about [ResponsiveImage](https://developers.quintype.com/quintype-node-components/tutorial-using-responsive-image.html) and [ResponsiveSource](https://developers.quintype.com/quintype-node-components/ResponsiveSource.html) components.

### When to use `ResponsiveImage` and `ResponsiveSource` components?

`ResponsiveSource` component is to be used if the aspect of an images changes significantly between different devices. Whereas, `ResponsiveImage` can be used when an image has an focus point. It accepts `aspectRation` and `metadata` prop to zoom into a particular part of the image.

### Using of webp images

Using of webp images helps in compression of images and makes the webpage faster. More about [webp](https://developers.google.com/speed/webp) can be found here. This can be done by passing a `type` prop to the `ResponsiveImage` component.

```javascript
import { ResponsiveSource } from "@quintype/components";

const SomeComponent = (props) => {
    return (
        <picture>
            <ResponsiveSource ... type="image/webp" />
        </picture>
    )
}
```

### Passing `widths` to `ResponsiveSource` Component

The `defaultWidth` and `widths` props can be used to tell the browser which sizes are available for any image.

```javascript
<ResponsiveImage ... defaultWidth={480} widths={[250,480,640]}/>
```

By specifying the respective `widths`, we tell the browser which image sizes are available for that particular image. Use specific widths for mobile and desktop views.

### Passing `sizes` to `ResponsiveSource` Component

The widths parameter tells the browser which image sizes are available. However, browsers still need some help choosing which size to download, particularly when the image is not full bleed.

In order to do this, you can use the sizes parameter. Let us consider the following application

```javascript
<ResponsiveImage ... sizes="(max-width: 500px) 98vw, (max-width: 768px) 48vw, 23vw"/>

```
This tells us that the image will be 98% of the screen width on mobile (upto 500px), 48% of the screen width on tablet, then 23% of the screen on desktop. The browser can calculate and make the call to fetch the appropriate image even before CSS is applied, based on the screen size.

Avoid bloating the site with heavy images. Use above `sizes` property to specify the required image dimensions for each resolution.

Example: If the Design requires the container (image) to be of 400w, make sure you're requesting for image slightly more than or equal to 400w, but not something like 200w, which will degrade the quality of image and also not something like 1000w, which will increase the size of your page.

## Lazy loading of image story elements

Using [WithLazy](https://developers.quintype.com/quintype-node-components/WithLazy.html) for story elements containing images like gallery or sliders can improve the performance of a webpage by loading the other images lazily.
