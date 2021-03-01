import React from "react";
import PT from "prop-types";

import "./hamburger-menu.m.css";

export const HamburgerMenu = ({ onMenuToggle, isMegaMenuOpen }) => (
  <button
    aria-label="Hamburger Menu"
    className="hamburger-menu"
    onClick={onMenuToggle}
    styleName={`hamburger ${isMegaMenuOpen ? "is-open" : ""}`}
  >
    {new Array(3).fill(<span styleName="line" />)}
  </button>
);

HamburgerMenu.propTypes = {
  onMenuToggle: PT.func,
  isMegaMenuOpen: PT.bool
};

export default HamburgerMenu;
