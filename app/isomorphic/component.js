const React = require("react");

const {HomePage} = require("./components/pages/home.jsx");
const {SectionPage} = require("./components/pages/section.jsx");
const {StoryPage} = require("./components/pages/story.jsx");
const {NotFoundPage} = require("./components/pages/not-found.jsx");
const {connect} = require("react-redux");

function pickComponent(pageType) {
  switch (pageType) {
    case 'home-page': return HomePage;
    case 'section-page': return SectionPage;
    case 'story-page': return StoryPage;
    default: return NotFoundPage;
  }
}

function IsomorphicComponentBase(props) {
  return React.createElement(pickComponent(props.pageType), props)
}

function mapStateToProps(state) {
  return {
    pageType: state.pageType,
    config: state.config,
    data: state.data
  }
}

function mapDispatchToProps() {
  return {};
}

exports.IsomorphicComponent = connect(mapStateToProps, mapDispatchToProps)(IsomorphicComponentBase);
