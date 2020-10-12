---
title: Implementing the Story page and Home Page Preview
parent: Malibu Tutorial
nav_order: 15
---

# {{page.title}}

*This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)*

In this tutorial, We will see how preview works in bold and steps to implement the feature in any frontend app.

## How preview works in Bold

Before publishing a story in Bold, you may be interested to see how it will look like on the website while creating the story.

**Steps to see preview in Bold:**

Click on any story which you have already published or add a new story.

![Story]({{"images/edit-story.png" | absolute_url}})

Once your story is in edit mode, you should be able to see the preview icon in the top right of the header.

![story preview icon]({{"images/story-preview-icon.png" | absolute_url}})

Click on the preview icon. After clicking on the preview icon,  you should be able to see a small window open on the right side of the editor. The default preview will be story page preview mobile size.

![Story preview]({{"images/story-preview.png" | absolute_url}})

You can change the preview to *desktop story preview*, *mobile homepage preview* and *desktop homepage preview* by clicking on **Others Preview** dropdown shoing on top of small window.

![Preview options]({{"images/preview-options.png" | absolute_url}})

## How it's worked

Whenever you clicked on any one of the preview buttons from the editor, the **/preview/story** API for story pages and **/preview/home** for home page API will get called with the postMessage() method. internally in the app has an event listener which will listen to the post-massage and return to the same iframe with the respective component from where it's being called, in our case, it will return to bold.

Here is an example of an event listener for postMessage() call.

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
In the above example, I have added an event listener to listen to any message passed by the postMessage() method during preview call and taking the data, storing it to state.

## Steps to implement the feature

If you are using Malibu, then you don't need to do anything. The preview feature that is already implemented in malibu by default.

But if you are not using malibu, then you need to do the following steps:-

## Add routes for Home page preview and Story page preview

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

### Rendering Story Page Preview

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

In the above example for story page preview, I have add **addEventListener()** to catch any kind of message sent by the postMessage() method and take the necessary data from the event and return to the iframe from where it's being called.

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
