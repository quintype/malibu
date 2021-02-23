import React from "react";
import get from "lodash/get";
import { object, bool } from "prop-types";
import assetify from "@quintype/framework/assetify";

import { MenuItem } from "../helper-components";

import "./styles.m.css";
import hamburger from "./square.png";

const NavBar = ({ menu }) => {
  return (
    <React.Fragment>
      <div styleName="navbar">
        <img styleName="hamburger" srcSet={` ${assetify(hamburger)}`} src={assetify(hamburger)} />
        <ul styleName="navbar-right">
          {get(menu, ["default"], []).map((item, index) => {
            return (
              <li key={`${item.id}${index}`} styleName="menu-item desktop-view">
                <MenuItem item={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

NavBar.propTypes = {
  menu: object,
  enableLogin: bool
};

export { NavBar };
