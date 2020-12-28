import React from "react";
import get from "lodash/get";
import { connect } from "react-redux";

import { NavBar } from "./nav-bar";

import "./header.m.css";

// Common wrapper for navigation. We could add OffcanvasMenu, Navbar etc components here.
class HeaderBase extends React.Component {
  render() {
    return (
      <div styleName="container">
        <NavBar {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menu: get(state, ["qt", "data", "navigationMenu"], [])
  };
}

export const Header = connect(
  mapStateToProps,
  () => ({})
)(HeaderBase);
