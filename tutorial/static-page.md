---
title: Adding a static page
nav_exclude: true
---

## Adding a static page

The content of static pages like `About us`, `Privacy policy` etc can be now controlled by the editors from the CMS. Thanks to the static pages feature on bold editor.

Rendering of static page happens in [Quintype Node Framework](https://github.com/quintype/quintype-node-framework). The exact location at which it happens is [here](https://github.com/quintype/quintype-node-framework/blob/master/server/handlers/custom-route-handler.js#L45).

The `customRouteHandler` function basically checks for the respective page type, loads the data and renders the content got from the API response. In case of static pages, the content that is added in the bold editor will be HTML content so that it gets rendered directly.

### Populating static links

The static links can be populated by grouping them under Menu Groups in the editor. These links can then be fetched from `/api/v1/config` and can be filtered wherever needed.

For example, let's say we want a bunch of static pages links on the footer like `About Us`, `Privacy Policy` and `Contact Us`.

We group these menu links under a group called `Footer Menu Links` in the editor. And in our `Footer` component we can get the `menuLinks` from the config and populate the UI.

In our `app/server/load-data.js` we need to filter the `footerMenuLinks` to the state.

```javascript
import { loadAuthorPageData } from "./data-loaders/author-page-data";

const getFooterMenuLinks = menuConfig =>
 menuConfig.filter(item => item["menu-group-slug"] === "footermenulinks")

export function loadData(pageType, params, config, client, { host, next }) {
    return _loadData().then(data => {
        return {
            ....
        data: {...data, ...{footerMenuLinks: getFooterMenuLinks(config.layout.menu)}}
        ....
        ....
        };
    });
}
```


```javascript
import React from "react";
import { connect } from "react-redux";
import { array } from "prop-types";
import get from "lodash/get";
import { Link } from "@quintype/components";

const renderFooter = footerMenuLinks =>
  footerMenuLinks.map(
    (item, index) =>
        <li styleName="list-item" key={index}>
            <Link href={item.completeUrl || "/"}>{item.title}</Link>
        </li>
  );

const Footer = ({ footerMenuLinks }) => (
  <div>
    <ul styleName="foobar">{renderFooter(footerMenuLinks)}</ul>
  </div>
);

const mapStateToProps = state => ({ footerMenuLinks: get(state, ["qt", "data", "footerMenuLinks"], []) })

Footer.propTypes = {
  footerMenuLinks: array
};

const FooterRow = connect(mapStateToProps)(Footer);

export default FooterRow;
```


### Adding styles to the static page content

The static content gets added in the div containing the class `static-container`. We can have a seperate file called `static-page.css` in our app that has custom styles(if needed) and have our app specific static page styles added in it.
