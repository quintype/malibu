---
title: Implementing the story page and home page preview
parent: Malibu Tutorial
nav_order: 15
---

# {{page.title}}

*This tutorial was contributed by [Harshith Raj](https://www.linkedin.com/in/harshith-raj-092ba4176/), [Shraddha](https://www.linkedin.com/in/harshith-raj-092ba4176/)*

Before publishing a story via Bold, you might be interested to preview it in your frontend. In this tutorial, we will walk through how previewing works in Bold and the steps that are required to implement the feature in your frontend application.

## How to preview the story in Bold

- Open the story that you want to preview.

![Story]({{"images/edit-story.png" | absolute_url}})

- You should be able to see the preview button in the top right corner of the page, in the header.

![story preview icon]({{"images/story-preview-icon.png" | absolute_url}})

- Clicking the preview button will open a window on the right side of your editor. This will preview the story page in mobile view by default.

![Story preview]({{"images/story-preview.png" | absolute_url}})

- You can toggle between *mobile home preview*, *desktop story preview* and *desktop home preview* previews by clicking on *other previews* dropdown.

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

### 1. Add routes for home page preview and story page preview

The first step of any new page is to create a route for it.

Ex:- In *app/server/routes.js*, we add the following lines for adding routes:

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

### 2. Add story-preview template 

Ex:- In *views/pages/story-preview.js*, we add the following lines for creating story content template:

```html
<script type="text/javascript" src="<%= assetPath("qtc-parsecsv.js") %>"></script>
<script type="text/javascript" src="<%= assetPath("vendors~qtc-parsecsv.js") %>"></script>
<script type="text/javascript" src="<%= assetPath("vendors~qtc-react-youtube.js") %>"></script>

<script type="text/javascript">
  var staticPageStoreContent = <%- JSON.stringify(store.getState()) -%>;
</script>
```

### 3. Loading the data

The next step is to load the data from your server.

For example, in *app/server/load-data.js*, we add the following:

```javascript
import { loadStoryPageData } from "./data-loaders/story-page-data";
import { loadHomePageData } from "./data-loaders/home-page-data";

export function loadData(pageType, params, config, client, { host, next }) {
  function _loadData() {
    switch (pageType) {
      ...
      case PAGE_TYPE.STORY_PREVIEW:
        return loadStoryPageData(client, params, config, next);
      case PAGE_TYPE.HOME_PREVIEW:
        return loadHomePageData(client, config);
      ...
    }
  }
```

### 4. Rendering story page preview

Once your data is loaded, then you need to create a story page component in the new file, and then you can call the story page component inside the story-preview.js to render the story page preview.

Ex:-  Story page component *app/isomorphic/components/pages/story.js*

```javascript
  class StoryPage extends React.Component {
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

Ex:- For story page preview component *app/isomorphic/components/pages/story-preview.js*.

```javascript

import React from "react";
import PropTypes from "prop-types";
import { StoryPage } from "./story.js"; //your story page component

const StoryPagePreview = (props) => {
  const [data, setData] = useState(null);

  const collectStoryData = () => {
    global.addEventListener("message", (event) => {
      if (event.data.story) {
        setData(event.data);
      }
    });
  };

  useEffect(() => {
    collectStoryData();
  }, []);

  return <StoryPage data={data} config={props.config} isPreview={true} />;
};

StoryPagePreview.propTypes = {
  config: object,
};

export { StoryPagePreview };

```

In the above example for story page preview, we have added **addEventListener()** to catch any kind of message sent by the postMessage() method and take the necessary data from the event and return it back to the iframe from where it's being called.

We need to export these two components and utilize them in pick-component file

Ex:- For exporting the story page and story page preview components *app/isomorphic/component-bundles/story.js*

```javascript

export { StoryPage } from "../components/pages/story";
export { StoryPreview } from "../components/pages/story-preview";

```

### 5. Rendering Home Page Preview

Similar to the story page preview, you can render your home page preview as well. You need to create routes, load the data, create a home page component where your home page data will show, and then render your home page preview

Ex:- Home page preview component */pages/home-preview.js*.

```javascript

import React from "react";
import { HomePage } from "./home.js";
import { replaceAllStoriesInCollection } from "@quintype/components";
import { object } from "prop-types";

const HomePagePreview = (props) => {
  const [started, setStarted] = useState(false);
  const [data, setData] = useState(props.data);

  const collectStoryData = () => {
    global.addEventListener("message", (event) => {
      if (event.data.story) {
        setStarted(true);
        const storyData = Object.assign({}, data, {
          collection: props.data.collection
            ? replaceAllStoriesInCollection(props.data.collection, event.data.story)
            : null,
        });
        setData(storyData);
      }
    });
  };

  useEffect(() => {
    collectStoryData();
  }, []);

  if (!started) return <div />;
  return <HomePage data={data} />;
};

HomePagePreview.propTypes = {
  data: object,
};

export { HomePagePreview };
```

In the above example, we are replacing all the stories with a respected collection for rendering on the home page.


### 6. Utilizing StoryPreview and HomePreview in pick-component file

Ex:- For utilizing in pick-component file *app/isomorphic/pick-component.js*

```javascript

import { PAGE_TYPE } from "./constants";
import { pickComponentHelper } from "@quintype/framework/server/pick-component-helper";

const { pickComponent, getChunkName } = pickComponentHelper(
  {
    ...
    [PAGE_TYPE.STORY_PREVIEW]: { chunk: "story", component: "StoryPreview" },
    [PAGE_TYPE.HOME_PREVIEW]: { chunk: "list", component: "HomePreview" },
    default: { chunk: "list", component: "NotFoundPage" },
  },
  {
    list: () => import(/* webpackChunkName: "list" */ "./component-bundles/list.js"),
    story: () => import(/* webpackChunkName: "story" */ "./component-bundles/story.js"),
  }
);

export { pickComponent, getChunkName };

```

You may now proceed to [Form Page]({{"/tutorial/form-page.html" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
