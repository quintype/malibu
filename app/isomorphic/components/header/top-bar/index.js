import React from "react";
import { AppLogo } from "../app-logo";

import "./top-bar.m.css";

const TopBar = () => (
  <div className="container">
    <div styleName="wrapper">
      <AppLogo />
      <div id="search-bar"></div>
    </div>
  </div>
);

export { TopBar };
