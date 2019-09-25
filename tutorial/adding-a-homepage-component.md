---
title: Adding a new component to your home page
nav_order: 03
parent: Malibu Tutorial
---

# WIP: {{page.title}}

In this chapter, we will add a new component to your home page, and configure this component from the editor.

## Creating the Component

Components are an essential part of any React application, and can be reused across your app.

For this example we will be creating a new component called ```TwoColGrid```

### Building the folder structure

* Create new folder  called ```two-col-grid``` inside ```app/isomorphic/components``` 

* Create an ```index.js``` and ```two-col-grid.m.css``` in above folder ```two-col-grid```

![Malibu Running]({{"images/creating-folder.gif" | absolute_url}})

### Setting up the HTML

The standard convention is to write the component within a file called `index.js`.

The simplest way to define a component is to write a React functional component. The `index.js` file contains the component, which accepts props as an argument and returns valid JSX.

```javascript
import React from "react";
import { array, object } from "prop-types";
import { Link, ResponsiveImage } from "@quintype/components";

import "./two-col-grid.m.css";

export function TwoColGrid({ collection, stories }) {
  return (
    <div>
      <h3 styleName="heading">{collection.name}</h3>
      <div styleName="wrapper">
        {stories.slice(0,6).map((story, index) => (
          <HorizontalStoryCard story={story} key={`${index}-${story.id}`}/>
        ))}
      </div>
    </div>
  );
}

TwoColGrid.propTypes = {
  collection: object,
  stories: array
};
```

The component ```HorizontalStoryCard``` which is responsible for the each horizontal story card.
```javascript
function HorizontalStoryCard({story}) {
  return (
    <Link href={`/${story.slug}`} styleName="horizontal-card">
      <div styleName="card-image">
        <figure className="qt-image-16x9" >
          <ResponsiveImage
            slug={story["hero-image-s3-key"]}
            metadata={story["hero-image-metadata"]}
            aspectRatio={[16, 9]}
            defaultWidth={480}
            widths={[250, 480, 640]}
            sizes="( max-width: 500px ) 98vw, ( max-width: 768px ) 48vw, 23vw"
            imgParams={{ auto: ["format", "compress"] }}
          />
        </figure>
      </div>
      <div styleName="card-content">
        <h2 styleName="section-name">{story.sections[0].name}</h2>
        <h3 styleName="card-title">{story.headline}</h3>
        <p styleName="author-name">{story["author-name"]}</p>
      </div>
    </Link>
  );
}
```

The component ```HorizontalStoryCard``` should see something like the following:
![Malibu Running]({{"images/horizontal-story-card.png" | absolute_url}})

### Styling the CSS
The ```two-col-grid.m.css``` file in which all style names are scoped locally by default.
The style name here are scoped locally. With CSS Modules, your CSS style names become similar to local variables in JavaScript.

```
.heading {
  font-size: 20px;
  text-transform: uppercase;
}

.horizontal-card {
  display: flex;
  background-color: #fff;
  padding: 12px;
  margin-bottom: 12px;
}

.card-image {
  flex-basis: 50%;
}

.card-content {
  padding-left: 12px;
  color: #000;
}

.section-name {
  font-size: 18px;
  margin: 0;
}

.card-title {
  font-size: 16px;
  line-height: 1.4;
  font-weight: normal;
}

.author-name {
  color: blue;
}

@media (min-width: 992px) {
  .wrapper {
    display: grid;
    grid-template-columns:  repeat(2, 1fr);
    grid-gap: 16px;
  }
}
```

### Seeing the component live

After creating the ```TwoColGrid``` component,import the component to the ```collection-template``` and use ```wrapCollectionLayout(component)``` ,this function will wrap a UI for the collection.


```javascript
import { wrapCollectionLayout, EagerLoadImages } from "@quintype/components";
import { FourColGrid } from "../four-col-grid";
import { TwoColGrid } from "../two-col-grid"
import React from "react";

function wrapEager(f) {
  return function WrapEager(props) {
    if (props.index === 0) {
      return (
        <EagerLoadImages predicate={token => token === "above-fold"}>{React.createElement(f, props)}</EagerLoadImages>
      );
    } else {
      return React.createElement(f, props);
    }
  };
}

export default {
  FourColGrid: wrapEager(wrapCollectionLayout(FourColGrid)),
  TwoColGrid: wrapEager(wrapCollectionLayout(TwoColGrid)),
  defaultTemplate: wrapEager(wrapCollectionLayout(TwoColGrid))
};

```

Open a browser, and navigate over to http://localhost:3000. You should see something that looks like the following:

![Malibu Running]({{"images/two-col-grid.png" | absolute_url}})

### Add to template options
```config/template-options.yml``` is a config file which is responsible for showing the various collection templates on the editor. 

```
collection-layouts:
- name: FourColGrid
  display: Default Malibu Widget
  options: []
```

### Deploy the app with [black knight]({{"/" | absolute_url}})
 
Go to [black knight]({{"/" | absolute_url}}) and deploy the latest build to the server. Please make sure that you are able to see the template options in the front end route (domain-name/template-options.json)

![Malibu Running]({{"images/template-options.gif" | absolute_url}})

### Configuring template with Bold

* Go to the editor and create a collection called **Home** that will appear on the home page.

* The layout of each collection on the home page will be decided based on the associated metadata
called layout set using the **manage** button against each collection.

* Click on the manage button to select one of the ```collection template``` from the drop down list.

![Malibu Running]({{"images/template-option-editor.gif" | absolute_url}})

* If the value of layout is anything other than the dropdown values, it will fall back to the default layout.