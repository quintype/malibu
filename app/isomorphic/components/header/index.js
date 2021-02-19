import React from "react";

import { NavBar } from "./nav-bar";
import { TopBar } from "./top-bar";

// Common wrapper for navigation. We could add OffcanvasMenu, Navbar etc components here.

const Header =() => {
  return (
    <React.Fragment>
        <TopBar />
        <NavBar/>
    </React.Fragment>

  );
}


export { Header }
