---
title: Progressive Image Loading
nav_order: 19
parent: Malibu Tutorial
---

# {{page.title}}

_This tutorial was contributed by [Harshith](https://www.linkedin.com/in/harshith-raj-092ba4176) and [Nandakishore Prakash Rao](https://twitter.com/nkp_adm)_

Images form an important asset for an application. Nearly 50% of a typical page’s weight is made up of images, optimizing images is extremely important for running a performant site. To solve this issue, we have implemented progressive image loading.

## What is progressive image loading?

Images load immediately on your website at first with a low resolution and then increase their resolution as the website loads completely. We have achieved this with the help of a couple of parameters supported by Gumlet - sizes and blur.

## How to implement it on your app?

### If your app is cloned from Malibu:

Go to the `views/pages/layout.ejs` file, modify the Gumlet config by adding `srcset: true`. This will enable the srcset and the image will be rendered from one among the srcsets generated by Gumlet.

```html
<script type="text/javascript">
  window.GUMLET_CONFIG = {
    ...
    ...
    srcset: true,
  };
</script>
```

Go to the file which uses `ResponsiveImage` imported from `@quintype/components`. Ex: `app/isomorphic/components/story-grid.js`.

1. Create a state, which contains a initial size and blur.
   Ex:

   ```javascript
   const [perfObj, setPerfObj] = useState({size: '5vw', blur: 10});
   ```

   **Note**: Keep the size as minimal as possible. Lower the size, lower is the LCP. Blur can be added or removed based on publisher requirements.

2. Update the value of size and blur in the state according to the requirements after an interval, to get a higher quality image.
   Ex:

   ```javascript
   const [perfObj, setPerfObj] = useState({size: '5vw', blur: 10});

   useEffect(() => {
     setTimeout(() => {
       setPerfObj({size: '25vw', blur: 0});
     }, 2500);
   }, []);
   ```

3. Pass the size and blur values to the `ResponsiveImage` component. Your final code should look something like this.

   ```javascript
   ...
   import React, { useState, useEffect } from "react";
   import { Link, ResponsiveImage } from "@quintype/components";
   ...
   ...

   function StoryGridStoryItem(props) {
     const [perfObj, setPerfObj] = useState({ size: "5vw", blur: 10 });

     useEffect(() => {
       setTimeout(() => {
         setPerfObj({ size: "25vw", blur: 0 });
       }, 2500);
     }, []);

     return (
       <Link href={`/${props.story.slug}`} className="story-grid-item">
         <figure className="qt-image-16x9" styleName="story-grid-item-image">
           <ResponsiveImage
             slug={props.story["hero-image-s3-key"]}
             metadata={props.story["hero-image-metadata"]}
             aspectRatio={[16, 9]}
             defaultWidth={480}
             widths={[250, 480, 640]}
             sizes={perfObj.size}
             imgParams={{ auto: ["format", "compress"], blur:perfObj.blur }}
             eager={props.position < 2 ? "above-fold" : "below-fold"}
             alt={props.story.headline || ""}
           />
         </figure>
         ...
         ...
       </Link>
     );
   }

   export function StoryGrid({ stories = [] }) {
     ...
     return (
       <div className="story-grid">
         {stories.map(story => (
           <StoryGridStoryItem story={story} />
         ))}
       </div>
     );
   }

   ```

**Note:**

1. The progressive image loading makes two calls for a particular image, during page load and after a specified interval.
2. Progressive image loading should be applied for the rows above the fold or in the initial viewport on each page to avoid multiple calls for a particular image.
3. For the pages which consist of only one row (Ex: Components with Load More button), this feature would be applied for all the stories which are loaded initially.

### How to achieve progressive image loading for the rows/components above the fold ?

- For Home Page/Collection Page/Section Page:

  - Home or collection page utilizes either `Collection` or `LazyCollection` HOC to render the rows/components. These higher order components return the index to each of its rows. Utilize this index value to achieve progressive image loading for the rows/components above the fold.

    For example in the file: `app/isomorphic/components/collection-templates/four-col-grid/index.js`, we are utilizing the index prop and we send it to the `StoryGrid` component as `rowNumber` as below

    ```javascript
    import React from 'react';
    import {array, object} from 'prop-types';
    import {StoryGrid} from '../../story-grid';
    import './four-col-grid.m.css';

    export function FourColGrid({collection, stories, index}) {
      return (
        <div>
          <h2 styleName="heading">{collection.name}</h2>
          <StoryGrid stories={stories} rowNumber={index} />
        </div>
      );
    }
    ```

  - Now in the `StoryGrid` component, utilize the `rowNumber` for progressive image loading.

    1. Pass the `rowNumber` value to `StoryGridStoryItem` function/component.
    2. Check if `rownumber` is less than 1 or 2, if it is then use low-quality image properties.

       Eg:

       ```
       const subsequentImageLoadProps = { size: "25vw", blur: 0 };
       const initialImageLoadProps = props.rowNumber < 2 ? { size: "5vw", blur: 10 } : subsequentImageLoadProps;
       ```

    Your final code should look something like this:

    ```javascript
    import React, { useState, useEffect } from "react";
    import { Link, ResponsiveImage } from "@quintype/components";
    ...
    ...

    function StoryGridStoryItem(props) {
      const subsequentImageLoadProps = { size: "25vw", blur: 0 };
      const initialImageLoadProps = props.rowNumber < 2 ? { size: "5vw", blur: 10 } : subsequentImageLoadProps;
      const [perfObj, setPerfObj] = useState(initialImageLoadProps);

      useEffect(() => {
        setTimeout(() => {
          setPerfObj(subsequentImageLoadProps);
        }, 2500);
      }, []);

      return (
        <Link href={`/${props.story.slug}`} className="story-grid-item">
          <figure className="qt-image-16x9" styleName="story-grid-item-image">
            <ResponsiveImage
              slug={props.story["hero-image-s3-key"]}
              metadata={props.story["hero-image-metadata"]}
              aspectRatio={[16, 9]}
              defaultWidth={480}
              widths={[250, 480, 640]}
              sizes={perfObj.size}
              imgParams={{ auto: ["format", "compress"], blur: perfObj.blur }}
              eager={props.position < 2 ? "above-fold" : "below-fold"}
              alt={props.story.headline || ""}
            />
          </figure>
          ...
        </Link>
      );
    }

    export function StoryGrid({ stories = [], rowNumber }) {
      return (
        <div className="story-grid">
          {stories.map((story, index) => (
            <StoryGridStoryItem story={story} rowNumber={rowNumber} />
          ))}
        </div>
      );
    }

    ```

Here, in the above example, the progressive image loading gets applied to the first two rows.

- For the story page, which is also similar to the above example, utilizes `InfiniteStoryBase` HOC to render the story page. This higher-order component returns the index value to `StoryPageBase`. Utilize this index value to achieve progressive image loading in the `StoryPageBase` function in `app/isomorphic/components/pages/story.js` and then repeat the same process in `BlankStory` to progressively render images for 1st story.

  ```javascript
  function StoryPageBase({index, story}) {
    return <BlankStory story={story} rowNumber={index} />;
  }
  ```

---

### If your app is not cloned from Malibu/Malibu advanced:

Wherever the Gumlet config is set, modify the Gumlet config by adding `srcset: true`. This will enable the srcset and the image will be rendered from one among the srcsets generated by Gumlet.

```html
<script type="text/javascript">
  window.GUMLET_CONFIG = {
    ...
    ...
    srcset: true,
  };
</script>
```

Then, wherever an image tag is used:

- For the initial load of the low-resolution image:

  ```html
  <img
    srcset="imgurl?blur=10 1024w, imgurl?blur=10 640w, imgurl?blur=10 480w"
    sizes="10vw"
  />
  ```

- For the subsequent load of the high resolution image:

  ```html
  <img
    srcset="imgurl?blur=0 1024w, imgurl?blur=0 640w, imgurl?blur=0 480w"
    sizes="25vw"
  />
  ```

The size and the blur value can be varied based on your preference.