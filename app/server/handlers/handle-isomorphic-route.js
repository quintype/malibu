const {IsomorphicComponent} = require('../../isomorphic/component');
const {generateRoutes} = require('../routes');
const {renderLayout} = require('./render-layout');
const {Provider} = require("react-redux");
const _ = require("lodash");

const React = require("react");
const ReactDOMServer = require('react-dom/server');

const {createStore} = require("redux");
const {loadHomePageData} = require("../data-loaders/home-page-data");
const {loadStoryPageData} = require("../data-loaders/story-page-data");
const {loadSectionPageData} = require("../data-loaders/section-page-data");

const WHITELIST_CONFIG_KEYS = ['cdn-image'];

function loadData(pageType, params, config) {
  function _loadData() {
    switch (pageType) {
      case "home-page": return loadHomePageData();
      case "story-page": return loadStoryPageData(params);
      case "section-page": return loadSectionPageData(params);
      default: return Promise.resolve({stories: [{headline: "Foobar"}]})
    }
  }

  return _loadData()
    .then((data) => ({pageType: pageType, data: data, config: _.pick(config, WHITELIST_CONFIG_KEYS)}));
}

exports.loadData = loadData;

exports.handleIsomorphicRoute = function handleIsomorphicRoute(req, res, {config}) {
  const url = urlLib.parse(req.url);
  const match = matchBestRoute(url.pathname, generateRoutes(config));
  if(match) {
    return loadData(match.pageType, match.params, config)
      .then((result) => {
        const context = {};
        const store = createStore((state) => state, result);
        renderLayout(res.status(200), {
          content: ReactDOMServer.renderToString(
            React.createElement(Provider, {store: store},
                React.createElement(IsomorphicComponent)))
        });
      });
  } else {
    renderLayout(res.status(404), {
      content: "Not Found"
    });
    return new Promise((resolve) => resolve());
  }
};
