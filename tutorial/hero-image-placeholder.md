---
title: Placeholder generation for the hero image
parent: Malibu Tutorial
nav_order: 27
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Harshith](https://www.linkedin.com/in/harshith-raj-092ba4176)_

An image placeholder is a background color over the space, on which an actual image will be loaded.

How Quintype handles image placeholder?

- Wrap `ResponsiveImage` component with `figure` tag.
- Based on aspect ratio of the image, provide `padding-top` for the `figure` tag using styleName/className.
- Use a generic styleName/className to the `figure` tag to provide required `background- color`.

Eg: 
```javascript
<figure className="qt-image-16x9" styleName="placeholder">
  <ResponsiveImage
  ...
  ...
  ...
  />
</figure>
```

```css
.qt-image-16x9 {
  padding-top: 56.25%;
  margin: 0;
  position: relative;
  overflow: hidden;

  & img {
    position: absolute;
    top: 0;
    left: 0;
  }
}

.placeholder {
  background-color: lightgrey;
}
```

If your app is cloned from `malibu-advanced`, we provide a toggle to enable placeholder, pass `enable_placeholder` from `/app/config/publisher.yml` in `black knight` under `publisher`, which accepts a boolean value.

Note: 
- We can delay the load of the image generating script to increase LCP and load the placeholder for a particular interval.
- If your app is cloned from `malibu-advanced`, pass `placeholder_delay` from `/app/config/publisher.yml` in `black knight` under publisher with the required interval. Eg: `placeholder_delay: 3`, in this example there will be a delay of 3 seconds post that, we will be loading the required script.

