---
title: Gumlet Integration
parent: Third Party Integrations
grand_parent: Malibu Tutorial
nav_order: 03
---

# {{page.title}}

*This tutorial was contributed by [Tejas Dinkar](https://twitter.com/tdinkar)*

Quintype is currently running a beta with [Gumlet](https://www.gumlet.com). Gumlet is a service that resizes images on the fly, transcoding to webp and detecting quality in runtime.

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

## Updating Publisher Config

The final step is to ask Quintype to switch your image CDN over to gumlet. This is done by writing to [support@quintype.com](mailto:support@quintype.com). This step will no longer be needed once the beta program is over. It is still safe to push the above two steps to beta / production before switching the final CDN step.

You may now proceed back to the list of [Tutorials]({{"/tutorial" | absolute_url}}).
