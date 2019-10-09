---
title: Metype Integration
parent: Malibu Tutorial
nav_order: 05
---

Metype provides a commenting system for users to engage with the content. It is basically an iframe that can be embedded in a story for comments.
In order to use metype in malibu, we can use [metype-react](https://github.com/quintype/metype-react), a react component to embed metype widgets.

In our `app/isomorphic/components` we can have something like, `metype-comments/index.js`, that can have the following code.

```javascript
import React from "react";
import { connect } from "react-redux";
import { MetypeCommentingWidget } from "@metype/components";
import get from "lodash/get";

const MetypeWrapperBase = ({ publisherAttributes = {}, story }) => (
  <div>
    <MetypeCommentingWidget
      host={publisherAttributes["metypeHost"]}
      accountId={publisherAttributes["metypeAccountId"]}
      pageURL={story.url}
      primaryColor={publisherAttributes["primaryColor"]}
      className={publisherAttributes["className"]}
    />
  </div>
);

const mapStateToProps = state => {
  return {
    publisherAttributes: get(state, ["qt", "config", "publisher"], {})
  };
};

const MetypeWrapper = connect(mapStateToProps)(MetypeWrapperBase);

export default MetypeWrapper;
```

### Why do we need the wrapper component?

We need the wrapper component in order to get the `publisherAttributes` that can be fed into the `MetypeCommentingWidget` component. The `MetypeCommentingWidget` takes few props and respective values to generate the iframe. These values can be fetched from `config/publisher.yml`.

`config/publisher.yml` should look something like this.

```yml
publisher :
  metypeHost: "https://staging.metype.com"
  metypeAccountId: "1"
  primaryColor: "#eeeeee"
  secondaryColor: "#ffffff"
  className: "story-comments-widget"
  publisher: "xyz"
```

The above file can be edited and updated in black knight's respective publisher's config file.

### Getting publisher attributes from yml file and adding it to the config

The publisher config value can be fetched from quintype/framework's [publisher-config](https://developers.quintype.com/quintype-node-framework/module-publisher-config.html). Once the value is fetched, we need to add it to the config in `app/server/load-data.js`.

Our `app/server/load-data.js`'s `loadData` method should look something like this.

```javascript
import config from "@quintype/framework/server/publisher-config";

....
....
....

const publisherAttributes = config.publisher || {};

export function loadData(....) {
    ....
    ....
    ....
    return {
      httpStatusCode: data.httpStatusCode,
      pageType: data.pageType,
      data,
      config: {...config.asJson(), ...{ publisherAttributes }}
    };
}

export function loadErrorData(....) {
   return Promise.resolve({
    data ,
    config: {...config, ...{ publisherAttributes }},
    });
};

```

Once the `publisherAttributes` are set into the config, it can be fed to the `MetypeWrapper` component and the respective iframe will get generated.



