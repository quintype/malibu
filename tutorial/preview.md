---
title: Implementing the story page and home page preview
parent: Malibu Tutorial
nav_order: 15
---

# {{page.title}}

*Author [Deo Kumar](https://www.linkedin.com/in/deo-kumar)*

Before publishing a story via Bold, you might be interested to preview it in your frontend. In this tutorial, we will walk through how previewing works in Bold and the steps that are required to implement the feature in your frontend application. 

## How to preview the story in Bold

1. Open the story that you want to preview.

![Story]({{"images/edit-story.png" | absolute_url}})

2. You should be able to see the preview button in the top right corner of the page, in the header.

![story preview icon]({{"images/story-preview-icon.png" | absolute_url}})

3. Clicking the preview button will open a window on the right side of your editor. This will preview the story page in mobile view by default.

![Story preview]({{"images/story-preview.png" | absolute_url}})

4. You can toggle between *mobile homepage*, *desktop story* and *desktop homepage* previews by clicking on *Other Previews* dropdown.

![Preview options]({{"images/preview-options.png" | absolute_url}})

## How it works

When you click on any of the preview options from the editor, the `/preview/story` route for story pages and `/preview/home` route for the home page will be called with the story data sent to it via the `postMessage` window method. The frontend app has an event listener on the `message` event which will receive the message that it received from `postMessage`. The receiving frontend page is an `iframe` inside Bold in case of the embedded preview or a new window in case of the desktop previews.

Example of an event listener for receiving the messages sent via the `postMessage` call.

```javascript
  global.addEventListener("message", event => {
      if (event.data.story) {
        this.setState({
          story: event.data.story,
          relatedStories: Array(4).fill(event.data.story),
          preview: true
        });
      }
    });
```

The event handler grabs the `story` data from the `event` and updates the state.

## Steps to implement the feature

If you are using Malibu, then you don't need to do anything. The preview feature that is already implemented in malibu by default.

But if you are not using malibu, then you need to do the following steps:-

## Add routes for home page preview and story page preview

The first step of any new page is to create a route for it.

Ex:- In *routes.js*, we add the following lines for adding routes:

```javascript
export const STATIC_ROUTES = [
  ...
  {
    path: "/preview/story",
    pageType: PAGE_TYPE.STORY_PREVIEW,
    exact: true,
    renderParams: { contentTemplate: "./story-preview" },
    disableIsomorphicComponent: false
  },
  {
    path: "/preview/home",
    pageType: PAGE_TYPE.HOME_PREVIEW,
    exact: true,
    renderParams: { contentTemplate: "./story-preview" },
    disableIsomorphicComponent: false
  }
];
```

### Loading the data

The next step is to load the data from your server.

For example, in *load-data.js*, we add the following:

```javascript
import { loadStoryPageData } from "./data-loaders/story-page-data";

export function loadData(pageType, params, config, client, { host, next }) {
  function _loadData() {
    switch (pageType) {
      ...
      case PAGE_TYPE.STORY_PREVIEW_PAGE:
        return loadStoryPageData(client, params, config, next);
      ...
    }
  }
```

### Rendering story page preview

Once your data is loaded, then you need to create a story page component in the new file, and then you can call the story page component inside the story-preview.js to render the story page preview.

Ex:-  Story page component */pages/story.js*

```javascript
  class StoryPagePreview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.collectStoryData();
    }
    render() {
      return <div>Story page data</div>
    }
  }
```

Ex:- For story page preview component */pages/story-preview.js*.

```javascript

import React from "react";
import PropTypes from "prop-types";
import { StoryPageContent } from "./story.js"; //your story page component

class StoryPagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.collectStoryData();
  }

  collectStoryData() {
    global.addEventListener("message", event => {
      if (event.data.story) {
        this.setState({
          story: event.data.story,
          relatedStories: Array(4).fill(event.data.story),
          preview: true
        });
      }
    });
  }

  render() {
    if (!this.state.story) return <div />;
    return StoryPageContent(
      Object.assign({ index: 0 }, this.state),
      this.props.config,
      this.props.renderStoryPageContent
    );
  }
}

export { StoryPagePreview };

```

In the above example for story page preview, I have added **addEventListener()** to catch any kind of message sent by the postMessage() method and take the necessary data from the event and return it back to the iframe from where it's being called.

That's it for story page preview, now you should able to see the story preview in your editor.

### Rendering Home Page Preview

Similar to the story page preview, you can render your home page preview as well. you need to create routes, load the data, create a home page component where your home page data will show, and then render your home page preview

Ex:- Home page preview component */pages/home-preview.js*.

```javascript

import React from "react";
import { HomePage } from "./home.js";
import { replaceAllStoriesInCollection } from "@quintype/components";

class HomePagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      data: props.data,
      preview: true
    };
  }

  componentDidMount() {
    this.collectStoryData();
  }

  collectStoryData() {
    global.addEventListener("message", event => {
      if (event.data.story) {
        this.setState({
          started: true,
          data: Object.assign({}, this.props.data, {
            collection: replaceAllStoriesInCollection(this.props.data.collection, event.data.story)
          })
        });
      }
    });
  }

  render() {
    if (!this.state.started) return <div />;
    return <HomePage data={this.state.data} />;
  }
}

export { HomePagePreview };
```

In the above example, we are replacing all the stories with a respected collection for rendering on the home page.

You may now proceed to [Third Party Integrations]({{"/tutorial/third-party-integrations.html" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
