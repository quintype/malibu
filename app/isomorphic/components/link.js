const React = require("react");
const {connect} = require("react-redux");
const {NAVIGATE} = require("../actions");
const _ = require("lodash");

function LinkBase(props) {
  return <a {..._.omit(props, "navigateTo")} onClick={(e) => {e.preventDefault(); e.stopPropagation(); props.navigateTo(props.href)}}/>;
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    navigateTo: function(url) {
      global.navigateToPage(dispatch, url);
    }
  };
}

exports.Link = connect(mapStateToProps, mapDispatchToProps)(LinkBase);
