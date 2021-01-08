import React from "react";
import get from "lodash/get";
import { array, string } from "prop-types";
import { connect } from "react-redux";

import TopHeader from "./top-header";
import MenuBar from "./menu-bar";

import "./header.m.css";

// Common wrapper for navigation. We could add OffcanvasMenu, Navbar etc components here.
class HeaderBase extends React.Component {

  render() {
    const { pageType } = this.props;
    return (
      <div>
        <TopHeader pageType={pageType}></TopHeader>
        <div id="menuBar"></div>
        {/* <MenuBar menuItems={this.props.menu} /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menu: get(state, ["qt", "data", "navigationMenu", "headerMenuLinks"], []),
    pageType: get(state, ["qt", "config", "page-type"], "")
  };
}

HeaderBase.propTypes = {
  menu: array,
  pageType: string
};

export const Header = connect(mapStateToProps, () => ({}))(HeaderBase);
