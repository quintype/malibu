import React from "react";
import get from "lodash/get";
import { connect } from "react-redux";

import { NavBar } from "./nav-bar";

import "./styles.m.css";

// Common wrapper for navigation. We could add OffcanvasMenu, Navbar etc components here.
class NavigationBase extends React.Component {
  render() {
    return (
      <div styleName="navigation-component">
        <NavBar {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: "malibu",
    menu: get(state, ["qt", "data", "navigationMenu"], []),
    socialLinks: get(state, ["qt", "config", "social-links"], []),
    config: state.qt.config || {}
  };
}

export const NavigationComponent = connect(
  mapStateToProps,
  () => ({})
)(NavigationBase);
