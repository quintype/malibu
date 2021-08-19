---
title: Gumlet Integration
parent: Third Party Integrations
grand_parent: Malibu Tutorial
nav_order: 03
---

# {{page.title}}

*This tutorial was contributed by [Tejas Dinkar](https://twitter.com/tdinkar)*

[Gumlet](https://www.gumlet.com) is a service that resizes images on the fly, transcoding to webp and detecting quality in runtime.

Integrating gumlet into quintype is pretty simple. You will need to load the gumlet script, and tell [@quintype/components](https://developers.quintype.com/quintype-node-components) to use gumlet.

## Adding Gumlet to layout.ejs

Somewhere in the head of your *views/pages/layout.ejs*, add the following snippet.

```html
<script type="text/javascript">
  window.GUMLET_CONFIG = {
    hosts: [{ current: "<%= config['cdn-image'] %>", gumlet: "<%= config['cdn-image'] %>" }],
    lazy_load: true,
    auto_webp: true
  }
</script>
<script src="https://cdn.gumlet.com/gumlet.js/2.0/gumlet.min.js" type="text/javascript" defer="defer"></script>
```

## Instructing components to use gumlet

The *[ResponsiveImage](https://developers.quintype.com/quintype-node-components/ResponsiveImage.html)* component pulls the image configuration from the redux store (which is populated from *[loadData](https://developers.quintype.com/malibu/isomorphic-rendering/server-side-architecture#loaddata)*).

Add the following to *app/server/load-data.js*

```javascript
export function loadData(pageType, params, config, client, { host, next }) {
  ...
  return _loadData().then(data => {
    return {
      ...
      config: Object.assign(pick(config.asJson(), WHITELIST_CONFIG_KEYS), {
        ...
        "image-cdn-format": "gumlet"
      })
    };
  });
}
```

## Setting sizes for Gumlet images

Wherever the Gumlet config is set, modify the config by adding `srcset: true`. This will enable the srcset and the image will be rendered from one among the srcsets generated.

```html
<script type="text/javascript">
  window.GUMLET_CONFIG = {
    ...
    ...
    srcset: true,
  };
</script>
```

When using `srcset`, the value for the `sizes` parameter must be added that allows you to control all aspects of resizing, cropping, and the fit-to-crop behaviour of your image.
If not added, it picks up the default value set in *[ResponsiveImage](https://developers.quintype.com/quintype-node-components/ResponsiveImage.html)* component.

The default component i.e., `FourcolGrid` uses `StoryGrid` component in which we need to add values to `sizes` parameter which inreturn will be passed to the *[ResponsiveImage](https://developers.quintype.com/quintype-node-components/ResponsiveImage.html)* component. Let us consider the following code -

<StoryGrid ... sizes="(max-width: 500px) 98vw, (max-width: 768px) 48vw, 23vw"/>

This tells us that the image will be 98% of the screen width on mobile (upto 500px), 48% of the screen width on tablet, then 23% of the screen on desktop. The maximum width of the image container depends on the `max-width` set in the app level in *app.scss* file. The browser can calculate and make the call to fetch the appropriate image even before CSS is applied, based on the screen size. Appropriate sizes are already passed to various components in [Arrow](https://developers.quintype.com/quintype-node-arrow/?path=/story/introduction--getting-started).


## Updating Publisher Config

The final step is to ask Quintype to switch your image CDN over to gumlet. This is done by writing to [support@quintype.com](mailto:support@quintype.com). This step will no longer be needed once the beta program is over. It is still safe to push the above two steps to beta / production before switching the final CDN step.

You may now proceed back to the list of [Tutorials]({{"/tutorial" | absolute_url}}).
