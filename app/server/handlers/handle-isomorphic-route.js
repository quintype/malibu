const {matchBestRoute} = require('../../isomorphic/match-best-route');
const {IsomorphicComponent} = require('../../isomorphic/component');
const {generateRoutes} = require('../routes');
const {renderLayout} = require('./render-layout');
const {Provider} = require("react-redux");
const urlLib = require("url");
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

exports.handleIsomorphicDataLoad = function handleIsomorphicDataLoad(req, res, {config}) {
  const url = urlLib.parse(req.query.path || "/");
  const match = matchBestRoute(url.pathname, generateRoutes(config));
  res.setHeader("Content-Type", "application/json");
  if(match) {
    return loadData(match.pageType, match.params, config)
      .then((result) => res.status(200).json(result));
  } else {
    res.status(404).json({
      error: {message: "Not Found"}
    });
    return new Promise((resolve) => resolve());
  }
};

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

exports.handleIsomorphicShell = function handleIsomorphicShell(req, res, {config}) {
  renderLayout(res.status(200), {
    content: '<div class="app-loading"></div>'
  });
}
