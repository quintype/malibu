import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import { object, bool } from "prop-types";

import { MenuItem } from "../menu-item";
import NavBarToggleBtn from "../../atoms/nav-bar-toggle-btn";

import "./navbar.m.css";

export const NavrBarToggle = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const menu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "hamburgerMenu"], []));
  if (menu.length < 1) {
    return null;
  }
  const onMenuToggle = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsMegaMenuOpen(false);
    }
  };

  return (
    <div styleName="dropdown" ref={wrapperRef}>
      <NavBarToggleBtn onMenuToggle={() => onMenuToggle()} isMegaMenuOpen={isMegaMenuOpen} />
      <ul styleName="dropdown-content" style={{ display: isMegaMenuOpen ? "block" : "none" }}>
        {isMegaMenuOpen &&
          menu.length > 0 &&
          menu.map(item => {
            return (
              <li key={item.title} styleName="dropdown">
                <MenuItem item={item} showIcon={false} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const NavBar = () => {
  const menu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "homeMenu"], []));
  return (
    <div styleName="main-wrapper">
      <nav className="container" styleName="wrapper">
        <div id="navbar-toggle"></div>
        <ul styleName="navbar">
          {menu.length > 0 &&
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
