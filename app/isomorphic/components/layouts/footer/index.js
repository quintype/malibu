import React from "react";
import PT from "prop-types";
import { connect, useSelector } from "react-redux";
import get from "lodash/get";

import "./styles.m.css";

import { MenuItem } from "../../header/helper-components";
import { AppLogo } from "../../header/app-logo";

const FooterBase = ({ footerLinks }) => {
  const footerMenu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "footer"], []));

  const parentMenus = footerMenu.filter(item => (item["item-type"] = "placeholder"));

  const menuList = {};
  parentMenus.forEach(menu => (menuList[menu.title] = menu.children));

  const categories = menuList["Popular Categories"].map(child => child);
  const sections = menuList["Popular Topics"].map(child => child);
  const links = menuList["Quick Links"].map(child => child);

  console.log(categories);

  const generateItemsList = (item, id) => (
    <li styleName="list-item" key={id}>
      <MenuItem item={item} />
    </li>
  );

  return (
    <div styleName="footer">
      <AppLogo />
      <div styleName="menu-group">
        <div styleName="footer-headings">Popular Categories:</div>
        <ul>{categories.map(generateItemsList)}</ul>
      </div>
      <div styleName="menu-group">
        <div styleName="footer-headings">Popular Topics:</div>
        <ul>{sections.map(generateItemsList)}</ul>
      </div>
      <div styleName="menu-group">
        <div styleName="footer-headings">Quick Links:</div>
        <ul>{links.map(generateItemsList)}</ul>
      </div>
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
