import React from "react";

import { TopBar } from "./top-bar";

// Common wrapper for navigation. We could add OffcanvasMenu, Navbar etc components here.

const Header = () => (
  <React.Fragment>
    <TopBar />
  </React.Fragment>
);

export { Header };
