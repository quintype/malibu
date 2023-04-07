---
title: Implementing Watermark on hero image of a story
parent: Custom SEO
grand_parent: Malibu Tutorial
nav_order: 06
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by Veena._

1. Stories that are shared on social media can have watermark on the hero image.

2. Watermarks are configured in Bold Editor in its correct dimensions. There will be no automatic image manipulation from the Bold side. 

3. By default watermark is enabled for all Stories;  We also have an option to toggle the watermark . Its available in BOLD under Advanced Options for Story => ``Disable Social Image Watermarking``  ; 

4. Story API response (`api/v1/stories-by-slug?slug={slug}`) gives watermark object **"watermark">"social">"image-s3-key"**
   which can be appended to hero image.

5. The following are the rules for the watermarked images:
  - Each section will have a watermark image associated with it. This image will be automatically added to each and every story belonging to this section at the time of publishing.
  - In case a story has more than one section associated with it, the watermark image of the first section added to this story will be picked
  - In case the story is republished by changing the first section, the image of the section which is currently in the first position will be used.
  - In case the watermark image of a section is changed in Bold, all the stories published prior to this change would still have the old watermark image, while any new story published will have the new one.
  - In case a story belongs to any section that does not have a dedicated watermark image, then it will default to a global watermark image.

6. If the image being picked as heroImage / alternate Image / fallbackSocialImage, then watermark is applied on the image;  
   If the image is picked as **logo_url or logo** or **undefined** then watermark won’t be applied.

7. This is implemented under SEO library ( ImageTags function ) - Og:image & twitter:Image tags are updated with  
   `overlay: watermarkImage` & `overlay_position: bottom` respectively.  

**NOTE:  Watermark is seen only when the story is shared on Social media ; We can not see it on the frontend; We can only check the updated metatags ( ex: og:image / twitter:image ) from viewPageSource.**

## How to add watermark on hero image of a story

This is implemented in SEO library.

Example:

```javascript
export function ImageTags(seoConfig, config, pageType, data, { url = {} }) {
  ...
  const isWatermarkDisabled = get(story, ["metadata", "watermark-image", "disabled"], fallbackValue);
  ...

  if (!image) {
    return [];
  }

  const tags = [];

  if (pageType == "story-page") {
    tags.push({ name: "robots", content: "max-image-preview:large" });
  }
  ...
  ...

  const getImageContent = (imageRatio) => {
    const imageProp = {
      w: 1200,
      ar: imageRatio.join(":"),
      auto: "format,compress",
      ogImage: true,
      mode: "crop",
      enlarge: true,
    };
    return isWatermarkDisabled ? getHeroImage(imageRatio, imageProp) : getWatermarkHeroImage(imageRatio, imageProp);
  };

  if (seoConfig.enableTwitterCards) {
    tags.push({
      name: "twitter:image",
      content: getImageContent([40, 21]),
    });
    ...
    ...
  }

  if (seoConfig.enableOgTags) {
    tags.push({
      property: "og:image",
      content: getImageContent([40, 21]),
    });
    ...
    ...
  }
  ...
  ...
  return tags;
}

```

