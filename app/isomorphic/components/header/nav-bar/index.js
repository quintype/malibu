import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import { object, bool } from "prop-types";

import { NavbarSearch } from "../navbar-search";
import { MenuItem } from "../menu-item";
import NavBarToggleBtn from "../../atoms/nav-bar-toggle-btn";

import "./navbar.m.css";

const NavBar = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const menu = useSelector((state) =>
    get(state, ["qt", "data", "navigationMenu", "homeMenu"], [])
  );

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
    <div styleName="main-wrapper">
      <div className="container" styleName="wrapper">
        <div styleName="dropdown" ref={wrapperRef}>
          <NavBarToggleBtn
            onMenuToggle={() => onMenuToggle()}
            isMegaMenuOpen={isMegaMenuOpen}
          />
          <ul
            styleName="dropdown-content"
            style={{ display: isMegaMenuOpen ? "block" : "none" }}
          >
            {isMegaMenuOpen &&
              menu.length > 0 &&
              menu.map((item) => {
                return (
                  <li key={item.title} styleName="dropdown">
                    <MenuItem item={item} showIcon={false} />
                  </li>
                );
              })}
          </ul>
        </div>

        <ul styleName="navbar">
          {menu.length > 0 &&
            menu.map((item) => {
              return (
                <li key={item.title} styleName="dropdown">
                  <MenuItem item={item} />
                  {item.children && item.children.length > 0 && (
                    <div styleName="dropdown-content">
                      <ul style={{ position: "relative" }}>
                      {item.children.map((item) => {
                        return (
                          <li key={item.title} styleName="dropdown">
                            <MenuItem
                              item={item}
                              showIcon={false}
                              key={item.title}
                            />
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
        {/* <NavbarSearch /> */}
        <div> user</div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  menu: object,
  enableLogin: bool,
};

export { NavBar };
