const React = require("react");

const {HomePage} = require("./components/pages/home.jsx")
const {NotFoundPage} = require("./components/pages/not-found.jsx")

function pickComponent(pageType) {
  switch (pageType) {
    case 'home-page': return HomePage;
    default: return NotFoundPage;
  }
}

function IsomorphicComponent(props) {
  return React.createElement(pickComponent(props.pageType), props)
}

exports.IsomorphicComponent = IsomorphicComponent;
