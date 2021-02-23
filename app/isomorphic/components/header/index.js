import React from "react";
import get from "lodash/get";
import { connect } from "react-redux";

import { NavBar } from "./nav-bar";
import { NavbarSearch } from "./navbar-search";
import { AppLogo } from "./app-logo";

import "./header.m.css";

class TopBar extends React.Component {
  render() {
    return (
      <div styleName="top-bar">
        <div styleName="top-bar-left">
          <AppLogo />
          <NavbarSearch />
        </div>
        <div>USER</div>
      </div>
    );
  }
}
// Common wrapper for navigation. We could add OffcanvasMenu, Navbar etc components here.
class HeaderBase extends React.Component {
  render() {
    return (
      <div styleName="container">
        <TopBar />
        <NavBar {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menu: get(state, ["qt", "data", "navigationMenu"], [])
});

export const Header = connect(mapStateToProps, () => ({}))(HeaderBase);
