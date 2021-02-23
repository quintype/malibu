import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import { object, bool } from "prop-types";

import { MenuItem } from "../menu-item";
import HamburgerMenu from "../../atoms/hamburger-menu";

import "./navbar.m.css";

const getNavbar = menu => {
  return (
    <ul styleName="navbar">
      {menu.length &&
        menu.map(item => {
          return (
            <li key={item.title} styleName="dropdown">
              <MenuItem item={item} />
              {item.children && item.children.length > 0 && (
                <div styleName="dropdown-content">
                  <ul style={{ position: "relative" }}>
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
  const wrapperRef = useRef(null);
  const menu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "homeMenu"], []));
  const hamburgerMenu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "hamburgerMenu"], []));

  const displayStyle = isMegaMenuOpen ? "block" : "none";

  return (
    <div styleName="main-wrapper" id="sticky-navbar">
      <nav className="container" styleName="wrapper">
        {hamburgerMenu.length && (
          <div styleName="dropdown" ref={wrapperRef}>
            <HamburgerMenu onMenuToggle={() => setIsMegaMenuOpen(!isMegaMenuOpen)} isMegaMenuOpen={isMegaMenuOpen} />
            <div styleName="overlay" onClick={()=> setIsMegaMenuOpen(false)}></div>
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
          </div>
        )}
        <div>{getNavbar(menu)}</div>
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
