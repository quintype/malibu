---
title:  Implementing Focus Point using Gumlet 
parent: Malibu Tutorial
nav_order: 27
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Athira](https://www.linkedin.com/in/athira-m-r-835ab6105/)_

Focus points are particularly useful for responsive layouts and to make sure the most important part of the image is always visible regardless of the element size.You can set a focal point to ensure that a key part of an image won't get cropped.  It will ensure that embarrassing image crops do not happen.

## How to set image Focus Point in Bold

![Image Focus Point]({{"images/set-image-focus-point.gif" | absolute_url}})

After you upload an image, you can click anywhere on that image to define a Focus Point for that image. Focus Point ensures that when an image gets cropped to different sizes, the set Focus Point will always be in the viewport.To remove the Focus Point applied to an image, click the Clear Focus Point button. By default, there is no focus point to be applied.


![Story API]({{"images/story-api.gif" | absolute_url}})

Once you set the Focus Point, in the story API we can see the image metadata which contains the `focus-point` in an array format. 

## How to implement Focus Point using Gumlet

Gumlet automatically converts images to the best format and size for the user browser and device. 
 
###  Extract (rect)

This `extract` parameter will extract a region from an image. The `rect` is an alias for this parameter. This operation is always applied before the `resize` operation. Please give the parameters according to the original image.

The value should be provided as a comma-separated list `left,top,width,height`.

- `left` is zero-indexed offset from left edge
- `top` is zero-indexed offset from top edge
- `width` of extracted image
- `height` of extracted image

Example : `extract=0,0,300,300`, `extract=300,300,200,200`


**How to find the `rect` value using image Focus Point and Aspect Ratio**

We need to find the image bounds using the Image Dimensions, Aspect Ratio and Focus Point.

Example: 

```javascript
function imageBounds(imageDimensions =[ 750, 422 ], aspectRatio=[ 16, 9 ], focusPoint=[ 125, 95 ]]) {
  
  // imageDimensions - Image Width and Height
  // aspectRatio -  Image Aspect Ratio
  // focusPoint - Image Focus Point 

  var expectedHeight, expectedWidth, bound;
  if (imageDimensions[0] * aspectRatio[1] < imageDimensions[1] * aspectRatio[0]) {
    // Use the entire width
    expectedHeight = (imageDimensions[0] * aspectRatio[1]) / aspectRatio[0];
    bound          = findBounds(imageDimensions[1], expectedHeight, focusPoint[1]);
    return [0, Math.round(bound), imageDimensions[0], Math.round(expectedHeight)];
  } else {
    // Use the entire height
    expectedWidth = (imageDimensions[1] * aspectRatio[0]) / aspectRatio[1];
    bound         = findBounds(imageDimensions[0], expectedWidth, focusPoint[0]);
    return [Math.round(bound), 0, Math.round(expectedWidth), imageDimensions[1]];
  }
}
...

function findBounds(imageWidth, cropWidth, focusPoint) {
  var leftBound = findLeftBound(imageWidth, cropWidth / 2, focusPoint);
  if (leftBound + cropWidth > imageWidth) {
    return (imageWidth - cropWidth);
  }
  else {
    return leftBound;
  }
}
...

function findLeftBound(imageWidth, halfCropWidth, focusPoint) {
  if (focusPoint - halfCropWidth < 0) {
    return 0;
  }
  else if (focusPoint + halfCropWidth > imageWidth) {
    return imageWidth - halfCropWidth;
  }
  else {
    return focusPoint - halfCropWidth;
  }
}

```

From the above example, we will get the `rect` value based on the aspect ratio and focus point.  Next, we need to pass this `rect` value as a parameter.

Example: `https://demo.gumlet.io/fall.jpeg?rect=0,0,750,422&format=auto`