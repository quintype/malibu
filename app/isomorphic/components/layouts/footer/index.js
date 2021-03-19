import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";

import { MenuItem } from "../menu-item";
import { AppLogo } from "../app-logo";

import "./styles.m.css";

const generateItemsList = (item, id) => (
  <li styleName="list-item" key={id}>
    <MenuItem item={item} menuStyle="menu-items-footer" />
  </li>
);

const generateMenuGroup = placeholderMenus => {
  return placeholderMenus.map(({ title, children }, id) => (
    <div styleName="menu-group" key={id}>
      <div styleName="footer-headings">{title}</div>
      <ul>{children.map(generateItemsList)}</ul>
    </div>
  ));
};

const FooterBase = footer => {
  const placeholderMenus = footer.menu.filter(item => (item["item-type"] = "placeholder"));

  return (
    <div styleName="footer">
      <AppLogo />
      {generateMenuGroup(placeholderMenus)}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    menu: get(state, ["qt", "data", "navigationMenu", "footer"], [])
  };
}

export const Footer = connect(mapStateToProps, null)(FooterBase);
