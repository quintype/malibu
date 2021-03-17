import React from "react";
import PT from "prop-types";
import { connect, useSelector } from "react-redux";
import get from "lodash/get";

import "./styles.m.css";

import { MenuItem } from "../menu-item";
import { AppLogo } from "../app-logo";

const FooterBase = () => {
  const footerMenu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "footer"], []));

  const parentMenus = footerMenu.filter(item => (item["item-type"] = "placeholder"));

  const menuList = {};
  parentMenus.forEach(menu => (menuList[menu.title] = menu.children));

  const generateItemsList = (item, id) => (
    <li styleName="list-item" key={id}>
      <MenuItem item={item} menuStyle="menu-items-footer" />
    </li>
  );

  const generateMenuGroup = menu => {
    const titles = Object.keys(menu);

    return titles.map((title, id) => (
      <div styleName="menu-group" key={id}>
        <div styleName="footer-headings">{title}</div>
        <ul>{menu[title].map(generateItemsList)}</ul>
      </div>
    ));
  };

  return (
    <div styleName="footer">
      <AppLogo />
      {generateMenuGroup(menuList)}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    footerLinks: get(state, ["qt", "data", "navigationMenu", "footerLinks"], [])
  };
}

FooterBase.propTypes = {
  footerLinks: PT.arrayOf(
    PT.shape({
      isExternalLink: PT.bool,
      completeUrl: PT.string,
      title: PT.string
    })
  )
};

export const Footer = connect(mapStateToProps, null)(FooterBase);
