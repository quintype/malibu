import React from "react";

import { TopBar } from "./top-bar";

// Common wrapper for navigation. We could add OffcanvasMenu, Navbar etc components here.

const Header = () => (
  <React.Fragment>
    <TopBar />
    <div id="nav-bar"></div>
  </React.Fragment>
);

export { Header };
