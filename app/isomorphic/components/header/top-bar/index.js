import React from "react";
import { AppLogo } from "../app-logo"
import { NavbarSearch } from "../navbar-search";

import "./top-bar.m.css";

const TopBar = () => {
  return(
    <div className="container">
      <div styleName="wrapper">
      <AppLogo />
      <NavbarSearch />
      </div>

    </div>
  );
}

export { TopBar }
