import React, { useState } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import { object, bool } from "prop-types";

import { MenuItem } from "../menu-item";
import HamburgerMenu from "../../atoms/hamburger-menu";

import "./navbar.m.css";

const getNavbarMenu = menu => {
  return (
    <ul styleName="navbar">
      {menu.length > 0 &&
        menu.map(item => {
          return (
            <li key={item.title} styleName="dropdown">
              <MenuItem item={item} />
              {item.children.length > 0 && (
                <div styleName="dropdown-content">
                  <ul>
                    {item.children.map(item => {
                      return (
                        <li key={item.title} styleName="dropdown">
                          <MenuItem item={item} showIcon={false} key={item.title} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );
};

const NavBar = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const menu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "homeMenu"], []));
  const hamburgerMenu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "hamburgerMenu"], []));

  const displayStyle = isMegaMenuOpen ? "block" : "none";
  const getDropdownList = () => {
    return (
      <ul styleName="dropdown-content" style={{ display: displayStyle }}>
        {isMegaMenuOpen &&
          hamburgerMenu.map(item => {
            return (
              <li key={item.title} styleName="dropdown">
                <MenuItem item={item} showIcon={false} />
              </li>
            );
          })}
      </ul>
    );
  };

  return (
    <div styleName="main-wrapper" id="sticky-navbar">
      <nav className="container" styleName="wrapper">
        {hamburgerMenu.length && (
          <div styleName="dropdown">
            <HamburgerMenu onMenuToggle={() => setIsMegaMenuOpen(!isMegaMenuOpen)} isMegaMenuOpen={isMegaMenuOpen} />
            <div styleName="overlay" onClick={() => setIsMegaMenuOpen(false)}></div>
            {getDropdownList()}
          </div>
        )}
        {getNavbarMenu(menu)}
        <div> user</div>
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  menu: object,
  enableLogin: bool
};

export { NavBar };
