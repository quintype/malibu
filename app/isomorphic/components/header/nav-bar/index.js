import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import { object, bool } from "prop-types";

import throttle from "lodash/throttle";
import { MenuItem } from "../menu-item";
import NavBarToggleBtn from "../../atoms/nav-bar-toggle-btn";

import "./navbar.m.css";

const NavBar = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const menu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "homeMenu"], []));

  const hamburgerMenu = useSelector(state => get(state, ["qt", "data", "navigationMenu", "hamburgerMenu"], []));

  const onMenuToggle = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };

  const handleScroll = e => {
    const navBar = document.getElementById("sticky-navbar");
    if (navBar) {
      const offsetTop = navBar.offsetTop;
      if (window.pageYOffset > offsetTop) {
        navBar.classList.add("sticky");
      } else {
        navBar.classList.remove("sticky");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", throttle(handleScroll, 50));
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsMegaMenuOpen(false);
    }
  };

  return (
    <div styleName="main-wrapper" id="sticky-navbar">
      <nav className="container" styleName="wrapper">
        {hamburgerMenu.length > 0 && (
          <div styleName="dropdown" ref={wrapperRef}>
            <NavBarToggleBtn onMenuToggle={() => onMenuToggle()} isMegaMenuOpen={isMegaMenuOpen} />
            <ul styleName="dropdown-content" style={{ display: isMegaMenuOpen ? "block" : "none" }}>
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
