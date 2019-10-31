---
title: Customizing Header and Footer
parent: Malibu Tutorial
nav_order: 08
---

# {{page.title}}

Most of the publishers have `Header` and `Footer` common across all the pages. The `Header` may contain the publisher logo and a few links which provides navigation to various pages in the website. The `Footer` may contain a copyright text and a few other links.

Malibu comes pre-loaded with a default `Header` and `Footer`. In this tutorial, we'll see how the header and footer works and also customizing it.

Both the components are rendered server side, and  have default Header and Footer that can be seen in `app/client/render.js` in the `preRenderApplication` method.

```javascript
import { Header } from "../isomorphic/components/header";
import { Footer } from "../isomorphic/components/layouts/footer";

export function preRenderApplication(store) {
  const hydrate = { hydrate: !global.qtLoadedFromShell };
  renderComponent(Header, "header", store, hydrate);
//   renderBreakingNews("breaking-news-container", store, BreakingNewsView, hydrate);
  renderComponent(Footer, "footer", store, hydrate);
}
```

### Customizing the Header

The `Header` component can be found in `app/isomorphic/components/header/index.js`. In this part, we'll see how we can customize the default `Header` component. We will use the [Atomic Design](https://developers.quintype.com/malibu/tutorial/implementing-a-design-system.html) approach to build the header.

In `app/isomorphic/components/header/index.js`, let's add our own code to customize the existing header.

```javascript
import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { array, string } from "prop-types";
import get from "lodash/get";
import { SearchBox, Link } from "@quintype/components";

import "./header.m.css";

import SearchWhite, { Search } from "../../atoms/icons/search";

class HeaderBase extends React.Component {
  constructor(props) {
    this.toggleMenuItem = this.toggleMenuItem.bind(this);
  }
  parentMenuLinks = headerMenuLinks => {
    return headerMenuLinks.filter(item => {
      return item["parent-id"] === null;
    });
  };

  generateMenuColumns = headerMenuLinks =>
    this.parentMenuLinks(headerMenuLinks).map((parentItemLink, index) => (
        <ul styleName="list" >
          <li styleName="list-style">
            <Link href={headerMenuColumn.completeUrl || "#"}>
              <span>{headerMenuColumn.title}</span>
            </Link>
          </li>
        </ul>
    ));

  render() {
    return (
      <div styleName="wrapper">
        <div styleName="logo-row">
            <div styleName="logo">
              <Link aria-label={`${"fpj-logo"}`} href={"/"}>
                <h1>LOGO</h1>
              </Link>
            </div>
          <Link href={"/contact"}>
            <div styleName="contact">Contact</div>
          </Link>
        </div>
        <nav styleName="navbar">
            <ul styleName="menu-group">
              <li styleName={`single-item ${styleName}`}>
                <Link href="/">Home</Link>
              </li>
              {this.generateMenuColumns(this.props.headerMenuLinks)}
            </ul>
          <span styleName="search-wrapper">
            <Search />
          </span>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    headerMenuLinks: get(state, ["qt", "data", "navigationMenu", "headerMenuLinks"], []),
  };
};

HeaderBase.propTypes = {
  headerMenuLinks: array
};

const Header = connect(mapStateToProps)(HeaderBase);

export default Header;
```

It should look like something like this,

![Header]({{"images/header.png" | absolute_url}})

### Customizing the Footer

The `Footer` component can be found in `app/isomorphic/components/footer/index.js`. In this part, we'll see how we can customize the default `Footer` component.

In `app/isomorphic/components/footer/index.js`, let's add our own code to customize the existing footer.

```javascript
import React from "react";
import { connect } from "react-redux";
import { array, string, object } from "prop-types";
import get from "lodash/get";
import { Link } from "@quintype/components";

import SocialShareIcons from "../../social-icons";

import "./footer.m.css";

const renderFooter = footerMenuLinks =>
  footerMenuLinks.map(
    (item, index) =>
        <li styleName="list-item" key={index}>
          <Link href={item.completeUrl || "/"}>{item.title}</Link>
        </li>
  );

const FooterBase = ({ footerMenuLinks, copyrightText, socialLinks }) => (
  <div styleName="wrapper">
    <ul styleName="menu-group">{renderFooter(footerMenuLinks)}</ul>
    <div styleName="copyright-social">
      <p styleName="copyright-text">
        {copyrightText}{" "}
        <a href="https://www.quintype.com" target="_blank" rel="noopener noreferrer">
          | Powered by Quintype{" "}
        </a>
      </p>
      {socialLinks && (
        <div styleName="follow-us">
          <span styleName="follow-us-text">Follow us on</span>
          <SocialShareIcons />
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    copyrightText: get(state, ["qt", "config", "publisher-settings", "copyright"], ""),
    footerMenuLinks: get(state, ["qt", "data", "navigationMenu", "footerMenuLinks"], []),
    socialLinks: get(state, ["qt", "config", "social-links"], [])
  };
};

FooterBase.propTypes = {
  copyrightText: string,
  footerMenuLinks: array,
  socialLinks: object
};

const Footer = connect(mapStateToProps)(FooterBase);

export default Footer;
```

It should look something like this,

![Footer]({{"images/footer.png" | absolute_url}})
