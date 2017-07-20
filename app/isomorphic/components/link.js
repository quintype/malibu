const React = require("react");
const {connect} = require("react-redux");
const {NAVIGATE} = require("../actions");

function LinkBase(props) {
  return <a {...props} onClick={(e) => {e.preventDefault(); e.stopPropagation(); props.navigateTo(props.href)}}/>;
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
