import React from "react";
import get from "lodash/get";
import { connect } from "react-redux";

import { NavBar } from "./nav-bar";

// Common wrapper for navigation. We could add OffcanvasMenu, Navbar etc components here.
class HeaderBase extends React.Component {
  render() {
    return (
        <NavBar {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  menu: get(state, ["qt", "data", "navigationMenu"], [])
});

export const Header = connect(mapStateToProps, () => ({}))(HeaderBase);
