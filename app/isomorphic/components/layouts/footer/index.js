import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";

import { MenuItem } from "../menu-item";
import { AppLogo } from "../app-logo";

import "./footer.m.css";

const generateItemsList = (item, id) => (
  <li styleName="list-item" key={id}>
    <MenuItem item={item} menuStyle="menu-items-footer" />
  </li>
);

const generateMenuGroup = placeholderMenus => {
  return placeholderMenus.map(
    ({ title, children }, id) =>
      children.length > 0 && (
        <div styleName="menu-group" key={id}>
          <h6 styleName="title">{title}</h6>
          <ul>{children.map(generateItemsList)}</ul>
        </div>
      )
  );
};

const FooterBase = footer => {
  const placeholderMenus = footer.menu.filter(item => (item["item-type"] = "placeholder"));

  return (
    <div className="container">
      <div styleName="footer">
        <div>
          <AppLogo />
        </div>
        {generateMenuGroup(placeholderMenus)}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    menu: get(state, ["qt", "data", "navigationMenu", "footer"], [])
  };
}

export const Footer = connect(mapStateToProps, null)(FooterBase);
