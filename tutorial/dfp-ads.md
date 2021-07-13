---
title: DFP ads on Malibu Advanced
parent: Malibu Advanced Tutorial
nav_order: 1
---

# {{page.title}}

_This tutorial was contributed by [Sanjeev Kumar G](https://twitter.com/sanju296) and [Phaneendra](https://www.linkedin.com/in/venkata-phaneendra-andukuri)_

### Steps to enable the ad:

1. Open BlackKnight.
2. Click on the config files and check for the `/app/config/ads.yml` file. If the file is not present, add the file.
3. Add the following key and respective values.

Sample `/app/config/ads.yml` config file -

```
dfp_ads:
  load_ads_synchronously: false
  enable_ads: true
  enable_lazy_load_ads: true
  fetch_margin_percent: 0
  render_margin_percent: 0
  mobile_scaling: 0
  delay_ad_script: 5.0
  delay_ad_load: 5.0
network_id: "5463099287"
slots:
  top_ad:
    ad_unit: "/5463099287/BannerAd"
    sizes: [[728, 90], [320, 50]]
    view_port_size_mapping:
      - viewport: [728, 0]
        sizes: [[728, 90]]
      - viewport: [0, 0]
        sizes: [[320, 50]]
  listing_page_ads:
    ad_unit: "/5463099287/ListingPageAd"
    sizes: [[728, 90], [300, 250]]
    view_port_size_mapping:
      - viewport: [728, 0]
        sizes: [[728, 90]]
      - viewport: [0, 0]
        sizes: [[300, 250]]
  story_page_ads:
    ad_unit: "/5463099287/ScrollAdUnit"
    sizes: [[728, 90], [300, 250]]
    view_port_size_mapping:
      - viewport: [728, 0]
        sizes: [[728, 90]]
      - viewport: [0, 0]
        sizes: [[300, 250]]

```

| Key                    | Type    | Description                                                                                                                                                                                     |
| ---------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dfp_ads                | object  | Contain keys related to ads                                                                                                                                                                     |
| enable_ads             | boolean | Toggle for enabling ads on the site                                                                                                                                                             |
| load_ads_synchronously | boolean | Toggle for loading ads synchronously or asynchronously on the site                                                                                                                              |
| delay_ad_script        | number  | Delays the ads script to reduce the impact of third party code which affects the page speed score. This arbitrary number might change depending upon the script parsing and the page rendering. |
| delay_ad_load          | number  | Delays the DfpSlot                                                                                                                                                                              |
| enable_lazy_load_ads   | boolean | Toggle for enabling lazy loading the ads on the site                                                                                                                                            |
| fetch_margin_percent   | number  | It fetches slots within specified viewports                                                                                                                                                     |
| render_margin_percent  | number  | It renders slots within specified viewports                                                                                                                                                     |
| mobile_scaling         | number  | It multiplies the specified value with the above values for mobile                                                                                                                              |
| network_id             | number  | DFP network id                                                                                                                                                                                  |
| slots                  | object  | Contain all the ad units required for the site                                                                                                                                                  |

## Slots

This object contains ad units with respective sizes.

| Key                    | Description                                                                                                                                                                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| top_ad                 | Key required to get the ad config related to the top ad.                                                                                                                                                                               |
| ad_unit                | It is the dfp network id followed by inventory name.                                                                                                                                                                                   |
| sizes                  | Sizes of respective inventory.                                                                                                                                                                                                         |
| view_port_size_mapping | Used to map the ad unit based on the viewport. In the above sample config of `top_ad`, the ad unit of size 728x90 is served on viewport above 728 pixels and the ad unit of size 320x50 is served on viewport between 0 pixels to 728. |

## Loading Ads Asynchronously or Synchronously

1. If load_ads_synchronously is `false`: it will be loading the script related to ads on the frontend with a delay of few seconds. Here, the ads will not be loaded on the initial page load, so there will be no impact on site performance.

2. If load_ads_synchronously is `true`: it will be loading the script related to ads on the initial page render and this will impact the site performance.

## Lazy Loading

Lazy loading enables pages to load faster, reduces resource consumption and contention, and improves view-ability rate by pausing the requesting and rendering of ads until they approach the user's viewport.

### Sample code -

```
googletag.pubads().enableLazyLoad({
  fetchMarginPercent: fetch_margin_percent , ( If fetch_margin_percent is 500, fetch slots within 5 viewports )
  renderMarginPercent: render_margin_percent, ( If render_margin_percent is 200, render slots within 2 viewports )
  mobileScaling: mobile_scaling ( If mobile_scaling is 2.0, it doubles the above values on mobile, where viewports are smaller and users tend to scroll faster )
});
```

The values for the above parameters `fetch_margin_percent`, `render_margin_percent` and `mobile_scaling`, by default is `0`.

## Key-Value Pairing

Key-values can be used to target ads more granularly than ad units.

For each ad request, you may pass one or more keys, each with one or more associated values. These key-values will be evaluated against targeting options configured at the line item-level in Ad Manager. For example, if you pass a custom key-value of `pageType="home-page"`, line items targeted to the pageType, `home-page` will be eligible to serve.

### Sample code -

```
googletag.cmd.push(function() {
  const responsiveAdSlot = googletag.defineSlot(path, size, id);
  if (responsiveAdSlot) {
    responsiveAdSlot
    .addService(googletag.pubads())
    .setTargeting("pageType", pageType)
    .setTargeting("environment", environment)
    .setTargeting("sectionSlug", sectionSlug)
    .setTargeting("sectionId", sectionId)
    .setTargeting("storyId", storyId)
    .setTargeting("sectionList", sectionList)
    .setTargeting("tagList", tagList);
  }
})

```

## Responsive ads

Responsive ads extend multi-size ads and allow you to specify the size of the creatives to serve based on the size of the viewport of the browser making the request. This functionality can be used to control the size of creatives served to different types of devices (desktop, tablet, mobile, etc.).

This is accomplished by defining a mapping between viewport size and ad size, then associating that mapping with an ad slot.

```
var mapping =
    googletag.sizeMapping()
             .addSize([1024, 768], [[750, 200], [728, 90]])
             .addSize([640, 480], [300, 250])
             .addSize([0, 0], [])
             .build();
responsiveAdSlot.defineSizeMapping(mapping);

```

In the above sample code, the mapping specifies:

- When viewport >= 1024x768, ads sized 750x200 or 728x90 may serve.
- When 1024x768 > viewport >= 640x480, ads sized 300x250 may serve.
- When viewport < 640x480, no ads will serve.

## Ad Units

### Top Ad ( top_ad )

- This ad shows up at the top of every page.
  Which looks like below on the Home page -

<img width="1200" alt="Screenshot 2021-03-30 at 1 46 25 PM" src="https://user-images.githubusercontent.com/18402707/112956814-77ee6e80-915e-11eb-8f79-81eccdf8f639.png">

### Listing Page Ads ( listing_page_ads )

- These Ads will be displayed after each collection on all listing pages.

<img width="674" alt="Screenshot 2021-03-30 at 4 42 37 PM" src="https://user-images.githubusercontent.com/18402707/112980033-fa832800-9176-11eb-9f40-39a30d8c767b.png">

### Story Page Ads ( story_page_ads )

- This Ad will be displayed after the first card in a story.

<img width="765" alt="Screenshot 2021-03-31 at 12 21 39 PM" src="https://user-images.githubusercontent.com/18402707/113102463-b39b3e00-921b-11eb-8904-d1beab61b41d.png">

For more info on DFP Ads implementation check [here](https://developers.google.com/publisher-tag/guides/get-started)

## Google Ad Manager

### Terms

1. **Network** - Company representing multiple advertisers and agencies.

1. **Advertiser** - Advertising organization purchasing your site inventory.

1. **Ad serving** - The process by which DFP chooses the best ads to serve to an ad request, and then returns the corresponding creative code

1. **Ad tag** - HTML tags or JavaScript code generated and then included in the webpage or app source where the ads should be displayed.

1. **Ad unit** - Discrete spaces on your site for ads. You can define an ad unit on your site with a name, description, and dimensions.

1. **Company** - An advertiser, agency, or organization that buys ad space and supplies the creatives for line items. Each order is associated with a company, and you can invite company contacts to view reports about their campaigns.

1. **Creative** - A code snippet, file, or link that generates an ad. (The terms creative and ad may be used interchangeably.) DFP supports a variety of creative types, including Third-party, Image, DoubleClick tag, and DoubleClick Rich Media.

1. **Creative assignment** - Type of assignment used to specify characteristics of how the creative is served, such as the click-through URL, the position of the creative in a sequential rotation, and so on.

1. **Creative association** - The assignment of one or more creatives to a line item.

1. **Creative rotation** - The technique by which multiple creatives assigned to a line item are displayed, either evenly, weighted, sequential, or optimized.

1. **Line item** - An advertiser's commitment to purchase a specific number of ad impressions (CPM), user clicks (CPC), or time (CPD), on certain dates at a specified price. A line item specifies where an advertiser's ads will appear and may specify when an ad may be shown.

1. **Order/Campaigns** - An agreement between an interactive advertising seller and a buyer that specifies the details of an advertising campaign. Orders contain one or more line items.

Let's see how to create ad units, orders, line items, and add creatives for the line items for the creative to get displayed on the pages.
An ad-unit is just a space that doesn't start to serve immediately after it's created. An order needs to be created which should have a line item, and the creatives for the ad to start delivering.

## **How to create an ad-unit in Google Ad manager?**

ad-units are a part of the inventory section of the Ad Manager.

1. Click on the dropdown for inventory and click on Ad units.
2. Click on the new ad unit.

![screenshot2](https://user-images.githubusercontent.com/15703500/114691868-bcb8fe80-9d35-11eb-9c43-3b4fd687e63f.jpg).

3. Choose the parent ad unit as `Top Level`, enter the details and save.

---

## **How to create an order for an ad-unit?**

1. Orders are a part of the delivery section of the ad manager.

2. Click on the delivery dropdown and click on orders.

![screenshot9](https://user-images.githubusercontent.com/15703500/114824331-5c33cb00-9de2-11eb-90bd-fdaf6bed075b.jpg).

3. Click on `New order`, enter the details and click on `Save`.

![screenshot18](https://user-images.githubusercontent.com/15703500/114842706-bccd0300-9df6-11eb-84c4-988bc0fb2b08.jpg)

4. Once saved, the line item needs to be added to the created order.

---

## How to create a line item for the created order?

1. Click on the new line item button and the ad type window would be shown.

![screenshot11](https://user-images.githubusercontent.com/15703500/114825683-28f23b80-9de4-11eb-86c3-6ffbca1cb2e2.jpg).

2. Click on `Select Display Ad` and enter the details.

![screenshot22](https://user-images.githubusercontent.com/15703500/114846129-00753c00-9dfa-11eb-90a6-a5a98018077e.jpg).

3. Scroll down to the targeting part and choose the ad-unit that needs to be targeted from the inventory, add any custom targeting if any, and click on `Save`.

![screenshot20](https://user-images.githubusercontent.com/15703500/114843681-b12e0c00-9df7-11eb-86b2-39d4404025ef.jpg).

4. Once Saved after entering all the details, creatives need to be added.

---

## **How to add creatives to the line items?**

1. Click on `Manage Creatives` on the right-hand corner.

![screenshot21](https://user-images.githubusercontent.com/15703500/114844634-9ad48000-9df8-11eb-8afc-24c16d452ab3.jpg).

2. Click on `Add Creatives` or `Bulk Upload Creatives` and choose the appropriate creatives of the respective sizes.

![screenshot15](https://user-images.githubusercontent.com/15703500/114828469-90f65100-9de7-11eb-92a8-313afb88711c.jpg).

3. Once the creatives are uploaded, click on continue.

4. Set the destination URL.

![screenshot16](https://user-images.githubusercontent.com/15703500/114828908-1548d400-9de8-11eb-9b80-02c2543b0b0c.jpg).

5. Click on `Done` and save.

6. The order needs to be approved.

7. Click on the created order, select the line item and click on `Approve`.

![screenshot23](https://user-images.githubusercontent.com/15703500/114852111-1be34580-9e00-11eb-942e-aa798ebd7775.jpeg).

---

The ads start to render once the status of the line items become `Delivering`.

The rendering of ads can be verified from the URL.

`https://pubads.g.doubleclick.net/gampad/adx?iu=/{ad-manager-id}/{ad-unit-name}&sz={creative-size}&c=213123123&m=text/html&cust_params={custom-target}%3D{custom-target-type}`

| Parametres         | Description                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ad-manager-id      | The account ID of the ad manager.                                                                                                                                                                                                            |
| ad-unit-name       | The ad-unit.                                                                                                                                                                                                                                 |
| creative-size      | the size of the creative to be displayed.Ex: 728x90, 320x50                                                                                                                                                                                  |
| c                  | Correlator (or, cache-busting) value. This must be a random number (letters are not permitted) generated by a publisher to ensure a fresh call to the ad server happens each time the page loads to avoid impression-counting discrepancies. |
| m                  | Mime-type value on the HTTP header. Ex: text/html                                                                                                                                                                                            |
| custom-target      | the target. Ex:pageType, sectionSlug etc.                                                                                                                                                                                                    |
| custom-target-type | the targeted page. Ex: home-page, section-page, {section-slug} etc                                                                                                                                                                           |

There could be other targeting parameters as well. The URL needs to be appended with `&` other targeting parameters that can be added.

Ex: `https://pubads.g.doubleclick.net/gampad/adx?iu=/{ad-manager-id}/{ad-unit-name}&sz={creative-size}&c=213123123&m=text/html&cust_params={custom-target}%3D{custom-target-type}&{custom-target}%3D{custom-target-type}`

More documentation on the URL.

https://support.google.com/admanager/answer/2623168?hl=en#optional-parameters.

https://support.google.com/admanager/answer/2623168?hl=en#required-parameters.
