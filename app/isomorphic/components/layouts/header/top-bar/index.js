import React from "react";
import { AppLogo } from "../../app-logo";

import "./top-bar.m.css";

const TopBar = () => (
  <div styleName="main-wrapper">
    <div className="container topbar-wrapper">
      <h1>
        <AppLogo />
      </h1>
      <div id="search-bar"></div>
    </div>
  </div>
);

export { TopBar };
