---
title: Metype Integration
parent: Malibu Tutorial
nav_order: 06
---

# {{page.title}}

*This tutorial was contributed by [Sai Charan](https://twitter.com/saiicharan)*

Metype provides a commenting system for users to engage with the content. It integrates as an iframe that can be embedded in a story for comments, as well as feeds for recent comments which can appear as a sidebar.

In order to use metype with malibu, we can use [metype-react](https://github.com/quintype/metype-react), a react component to embed metype widgets.

Before getting started, please ensure that the domain you are currently working on (both localhost and the staging domain) is whitelisted in your metype configuration.

## Integrating Metype Comments

In our *app/isomorphic/components* we create *metype-comments/index.js*, that exports the metype commenting widget.

```javascript
import React from "react";
import { connect } from "react-redux";
import { MetypeCommentingWidget } from "@metype/components";
import get from "lodash/get";

const MetypeCommentsBase = ({ metypeConfig = {}, story }) => (
  <div>
    <MetypeCommentingWidget
      host={metypeConfig["host"]}
      accountId={metypeConfig["accountId"]}
      pageURL={story.url}
      primaryColor="#eeeeee"
      className="metype-comments-widget"
    />
  </div>
);

const mapStateToProps = state => {
  return {
    metypeConfig: get(state, ["qt", "config", "metype"], {})
  };
};

const MetypeComments = connect(mapStateToProps)(MetypeCommentsBase);

export default MetypeComments;
```

### Why do we need the wrapper component?

We need the wrapper component in order to get the metype configuration (including the *metypeHost* and *metypeAccountId*). These values come from *config/publisher.yml*.

`config/publisher.yml` should look something like this.

```yaml
publisher :
  metype:
    host: "https://staging.metype.com"
    accountId: "1"
```

The above file can be edited and updated in black knight's respective publisher's config file.

### Passing the new configuration to MetypeComments

The publisher config value can be fetched from quintype/framework's [publisher-config](https://developers.quintype.com/quintype-node-framework/module-publisher-config.html). Once the value is fetched, we need to add it to the config in `app/server/load-data.js`.

Our `app/server/load-data.js`'s `loadData` will get amended to look something like this.

```javascript
import config from "@quintype/framework/server/publisher-config";
...
export function loadData(....) {
    ...
    return {
      ...,
      config: {...config, metype: config.metype || {}},
    };
}

export function loadErrorData(....) {
  return Promise.resolve({
    ...,
    config: {...config, metype: config.metype || {}},
  });
};
```

### Adding the component onto the story page.

Finally, we add the component onto the story page. Let's add this to the end of the story page. Here, we append to the *BlankStory* component, found in *app/isomorphic/components/story-templates/blank.js*.

```javascript
...
import MetypeComments from "../metype-comments";
...

function BlankStory(props) {
  return (
    <div className="story-grid">
      <BlankStoryTemplate story={props.story} />
      <MetypeComments story={props.story}/>
    </div>
  );
}
```

### Seeing it live

![Metype Comments Widget]({{"images/metype-comments-widget.png" | absolute_url}})

## Integrating the Feed Widget

FIXME: Please add content
