import React from "react";
import get from "lodash/get";
import {connect} from "react-redux";

import { NavBar } from './nav-bar';

import "./styles.m.css";

class NavigationBase extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return <React.Fragment>
      <NavBar {...this.props} />
    </React.Fragment>
  }
}

function mapStateToProps(state) {
  return {
    title: 'malibu',
    menu: get(state, ["qt", "data", "navigationMenu"], []),
    socialLinks: get(state, ["qt", "config", 'social-links'], []),
    config: state.qt.config || {},
  };
}

export const NavigationComponent = connect(mapStateToProps, () => ({}))(NavigationBase);
