import React from "react";

import "./top-bar.m.css";

const TopBar = () => (
  <div styleName="main-wrapper" style={{ height: 70 }}>
    <div className="container topbar-wrapper">
      <div id="app-logo"></div>
      <div id="search-bar"></div>
    </div>
  </div>
);

export { TopBar };
