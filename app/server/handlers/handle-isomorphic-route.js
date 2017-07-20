const {matchBestRoute} = require('../../isomorphic/match-best-route');
const {IsomorphicComponent} = require('../../isomorphic/component');
const {generateRoutes} = require('../routes');
const {renderLayout} = require('./render-layout');
const urlLib = require("url");

const React = require("react");
const ReactDOMServer = require('react-dom/server');

function loadData(pageType, params) {
  return new Promise((resolve) => {
    if(pageType == "story-page") {
      resolve({story: {headline: "Foobar"}});
    } else {
      resolve({stories: [{headline: "Foobar"}]});
    }
  })
}

exports.handleIsomorphicRoute = function handleIsomorphicRoute(req, res, {config}) {
  const url = urlLib.parse(req.url);
  const match = matchBestRoute(url.pathname, generateRoutes(config));
  if(match) {
    loadData(match.pageType, match.params)
      .then((data) => {
        const component = React.createElement(IsomorphicComponent, {
          config: config,
          data: data,
          pageType: match.pageType
        });
        renderLayout(res.status(200), {
          content: ReactDOMServer.renderToString(component)
        });
      });
  } else {
    renderLayout(res.status(404), {
      content: "Not Found"
    });
  }
}
