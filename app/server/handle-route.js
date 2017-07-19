const client = require("./client");

const {generateRoutes, matchBestRoute} = require('../isomorphic/routes');
const {renderLayout} = require('./render-layout');
const urlLib = require("url");

exports.handleIsomorphicRoute = function handleIsomorphicRoute(req, res) {
  var config;
  client.getConfig()
    .then((c) => config = c)
    .then(() => {
      const url = urlLib.parse(req.url);
      const match = matchBestRoute(url.pathname, generateRoutes(config));
      if(match) {
        renderLayout(res.status(200), {
          content: `<pre>
            pageType: ${match.pageType},
            params: ${match.match.params}
          </pre>`
        });
      } else {
        renderLayout(res.status(404), {
          content: "Not Found"
        });
      }
    })
}
