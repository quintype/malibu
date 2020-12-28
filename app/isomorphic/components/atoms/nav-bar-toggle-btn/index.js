import React from "react";
import PT from "prop-types";

import "./nav-bar-toggle-btn.m.css";

export const NavBarToggleBtn = ({ onMenuToggle, isMegaMenuOpen, id }) => {
  return (
    <button  onClick={onMenuToggle} styleName={`hamburger ${(isMegaMenuOpen && id === 0) ? "is-open" : ""}`}>
      <span styleName="line" />
      <span styleName="line" />
      <span styleName="line" />
    </button>
  );
};

NavBarToggleBtn.propTypes = {
  onMenuToggle: PT.func,
  isMegaMenuOpen: PT.bool
};

export default NavBarToggleBtn;
