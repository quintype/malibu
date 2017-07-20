const {matchBestRoute} = require('../../isomorphic/match-best-route');
const {IsomorphicComponent} = require('../../isomorphic/component');
const {generateRoutes} = require('../routes');
const {renderLayout} = require('./render-layout');
const {Provider} = require("react-redux");
const urlLib = require("url");

const React = require("react");
const ReactDOMServer = require('react-dom/server');

const {createStore} = require("redux");

function loadData(pageType, params) {
  return new Promise((resolve) => {
    if(pageType == "story-page") {
      resolve({story: {headline: "Foobar"}});
    } else {
      resolve({stories: [{headline: "Foobar"}]});
    }
  })
}

exports.handleIsomorphicDataLoad = function handleIsomorphicDataLoad(req, res, {config}) {
  const url = urlLib.parse(req.query.path || "/");
  const match = matchBestRoute(url.pathname, generateRoutes(config));
  res.setHeader("Content-Type", "application/json");
  if(match) {
    return loadData(match.pageType, match.params)
      .then((data) => {
        res.status(200).json({
          pageType: match.pageType,
          data: data,
          config: config
        })
      });
  } else {
    res.status(404).json({
      error: {message: "Not Found"}
    });
    return new Promise((resolve) => resolve());
  }
}

exports.handleIsomorphicRoute = function handleIsomorphicRoute(req, res, {config}) {
  const url = urlLib.parse(req.url);
  const match = matchBestRoute(url.pathname, generateRoutes(config));
  if(match) {
    return loadData(match.pageType, match.params)
      .then((data) => {
        const context = {};
        const store = createStore((state) => state, {
          config: config,
          data: data,
          pageType: match.pageType
        });
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
}
