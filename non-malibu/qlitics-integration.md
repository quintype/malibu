---
title: Qlitics Integration
parent: Non Malibu Publisher
nav_order: 02
---

# {{page.title}}

The `qlitics.js` is a Javascript library that is used for tracking user interaction with the frontend website.

This tutorial consists of Qlitics related functions. The vast majority of these features are already wired and tracked by default (including when pages are loaded via AJAX) if you are a Malibu publisher. If a non Malibu publisher, then you need to call them manually.

## Implementation for Non-Malibu Publishers

Frontend website needs to implement a route `/qlitics.js` that proxies to the same route on `API_HOST`. The `qlitics.js` snippet served by `API_HOST` has the correct `publisher-id` hardcoded in it.


### Initialize the tracker

Embed the following script before the closing `</head>` tag (or as early as possible).

```Javascript
<script>
  window.qlitics=window.qlitics||function(){(qlitics.q=qlitics.q||[]).push(arguments);};
  qlitics('init');
</script>
<script async src='/qlitics.js'></script>
```
where `init` initializes the tracker. It should be the first API to be called. It also generates (or reuses) the device tracking id and the session id.


### Set a property on the tracker

To set a property on the tracker use `set`. It accepts a `property` and a `value` for that property.

| Key | Property | Value | Comments 
---| --- |--- | ---
set  | String | Any | One of the [settable](https://developers.quintype.com/docs/#settable-api-properties) properties.

### Set Current Member id

The member id of the logged in member.

```Javascript
qlitics('set', 'member-id', 1234);
```

### To track events

To track one of the user interaction events like Page view tracking, Story view tracking, etc. `track` Key is used.


### Page view Tracking

To track a page view, `page-view` key should be called on every page load. It shouldn't be called for pages loaded via ajax. It Accepts a hashmap specifying the `page-type`. Refer [common API fields](https://developers.quintype.com/docs/#common-api-fields).

```html
<script>
  window.qlitics=window.qlitics||function(){(qlitics.q=qlitics.q||[]).push(arguments);};
  qlitics('init');
  qlitics('track', 'page-view', {'page-type': 'home'});
</script>
```

### Story view tracking

To track a Story view, `story-view` should be called when a story page is loaded. A story view depends on a `page-view` and should be called only after a `page-view` has been tracked. If additional stories are being loaded via ajax, then this event should be tracked for each of those stories as well. This will reuse the initially triggered page view's identifier. Refer [common API fields](https://developers.quintype.com/docs/#common-api-fields).

```html
<script>
  window.qlitics=window.qlitics||function(){(qlitics.q=qlitics.q||[]).push(arguments);};
  qlitics('init');
  ...
  qlitics('track', 'story-view', {
    'story-content-id': '9b2fe90f-b155-4624-862e-88c981c9da6c',
  });
  ...
</script>
```

### Story element view Tracking

To track a story element view, `story-element-view` should be called the first time a story element comes into the browser's viewport. This is used to track all story elements did the user view and how much time was spent on that story. Refer [common API fields](https://developers.quintype.com/docs/#common-api-fields).

```html
<script>
  window.qlitics=window.qlitics||function(){(qlitics.q=qlitics.q||[]).push(arguments);};
  qlitics('init');
  ...
  qlitics('track', 'story-element-view', {
     'story-content-id': '9b2fe90f-b155-4624-862e-88c981c9da6c',
     'story-version-id': 'bc1295de-1b29-4588-8822-3949510b5fd6',
     'card-content-id': '505d5c9d-e776-4f17-bd53-8dd8d579122d',
     'card-version-id': 'abfcabf3-6dcc-4791-a87e-16a36c1b1ae6',
     'story-element-id': '1f97a56d-be01-4a2d-b319-0e88cf9a2259',
     'story-element-type': 'youtube-video',
  });
  ...
</script>
```

### Story element action Tracking

To track any user interaction with a story element, `story-element-action` should be called. For example, the playing and pausing of a youtube video, as well as whether the user saw the entire video or not can be tracked. Refer [common API fields](https://developers.quintype.com/docs/#common-api-fields).

```html
<script>
  window.qlitics=window.qlitics||function(){(qlitics.q=qlitics.q||[]).push(arguments);};
  qlitics('init');
  ...
  qlitics('track', 'story-element-action', {
   'story-content-id': '9b2fe90f-b155-4624-862e-88c981c9da6c',
   'story-version-id': 'bc1295de-1b29-4588-8822-3949510b5fd6',
   'card-content-id': '505d5c9d-e776-4f17-bd53-8dd8d579122d',
   'card-version-id': 'abfcabf3-6dcc-4791-a87e-16a36c1b1ae6',
   'story-element-id': '1f97a56d-be01-4a2d-b319-0e88cf9a2259',
   'story-element-type': 'youtube-video',
   'story-element-action': 'play',
  });
  ...
</script>
```

### Story share Tracking

To track Story share, `story-share` should be called when a user shares a story on social media via the story page. Refer [common API fields](https://developers.quintype.com/docs/#common-api-fields).

```html
<script>
  window.qlitics=window.qlitics||function(){(qlitics.q=qlitics.q||[]).push(arguments);};
  qlitics('init');
  ...
  qlitics('track', 'story-share', {
    'story-content-id': '9b2fe90f-b155-4624-862e-88c981c9da6c',
    'social-media-type': 'facebook',
    'url': 'https://publisher-domain.com/story-slug',
  });
  ...
</script>
```
