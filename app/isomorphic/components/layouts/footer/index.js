import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { object } from "prop-types";

import { MenuItem } from "../menu-item";

import "./footer.m.css";

const MenuGroup = ({ menus }) => {
  return menus.map(
    ({ title, children }, id) =>
      children.length > 0 && (
        <div styleName="menu-group" key={id}>
          <h6 styleName="title">{title}</h6>
          <ul>
            {children.map((item, id) => (
              <li styleName="list-item" key={id}>
                <MenuItem item={item} menuStyle="menu-items-footer" />
              </li>
            ))}
          </ul>
        </div>
      )
  );
};

const FooterBase = ({ menu }) => {
  const placeholderMenus = menu.filter(item => (item["item-type"] = "placeholder"));

  return (
    <div className="container">
      <div styleName="footer">
        <div id="app-logo-footer"></div>
        <MenuGroup menus={placeholderMenus} />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    menu: get(state, ["qt", "data", "navigationMenu", "footer"], [])
  };
}

FooterBase.propTypes = {
  menu: object
};

export const Footer = connect(mapStateToProps, null)(FooterBase);
