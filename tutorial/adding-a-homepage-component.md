---
title: Adding a new component to your home page
post_number: 03
tutorial: true
---

# {{page.title}}

In this chapter, we will discuss how to add a new component to your home page and how we choose different template options for each home collection from the editor.

## How to create a new component?

Components are an essential part of any React application, that we can reuse all over our site.

step 1
* Create new folder  called ```four-col-grid``` inside ```app/isomorphic/components/four-col-grid``` 

* Create an ```index.js``` and ```four-col-grid.m.css``` in above folder ```four-col-grid```

![Malibu Running]({{"images/creating-folder.gif" | absolute_url}})

* The FourColGrid component is our main row and it contains the ```StoryGrid``` as a molecule, which is responsible for each story card.

``` 
import React from "react";
import { StoryGrid } from "../story-grid";
import "./four-col-grid.m.css";

export function FourColGrid({ collection, stories }) {
  return (
    <div>
      <h3 styleName="heading">{collection.name}</h3>
      <StoryGrid stories={stories} />
    </div>
  );
}

```

step 2 

* After creating the row component, import the component to the collection-layout and use ```wrapCollectionLayout(component)``` , this function will wrap a UI for the collection.


```
import { wrapCollectionLayout } from "@quintype/components";
import { FourColGrid } from  "../four-col-grid"

export default {
  FourColGrid: wrapCollectionLayout(FourColGrid),
  defaultTemplate:wrapCollectionLayout(FourColGrid)
};
```

step 3 : 

* From the ```config``` folder  select ```template-options.yml``` file and add all the available collection layouts

```
collection-layouts:
- name: FourColGrid
  display: Default Malibu Widget
  options: []
```

step 4  
* Go to black-knight and create a config file ``` /app/config/template-options.yml```, add all the collection layout and push the instance to the env. Please make sure that you are able to see the template options in the front end route (domain-name/template-options.json)

![Malibu Running]({{"images/template-options.gif" | absolute_url}})

## Configure collection template on Bold

step 5 
* Go to the editor and create a collection called **Home** that will appear on the home page.

* The layout of each collection on the home page will be decided based on the associated metadata 
called layout set using the **manage** button against each collection. 

* Click on the manage button to select one of the ```collection template``` from the drop down list.

![Malibu Running]({{"images/template-option-editor.gif" | absolute_url}})

* If the value of layout is anything other than the dropdown values, it will fall back to the default layout.



_To create a new component repeat from step 1 to step 5_