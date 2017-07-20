const React = require("react");

const {HomePage} = require("./components/pages/home.jsx")
const {NotFoundPage} = require("./components/pages/home.jsx")

function pickComponent(pageType) {
  switch (pageType) {
    case 'home-page': return HomePage;
    default: return NotFound;
  }
}

function IsomorphicComponent(props) {
  return React.createElement(pickComponent(props.pageType), props)
}

exports.IsomorphicComponent = IsomorphicComponent;
