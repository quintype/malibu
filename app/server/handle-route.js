const client = require("./client");

const {generateRoutes, matchBestRoute} = require('../isomorphic/routes');
const {renderLayout} = require('./render-layout');


exports.handleIsomorphicRoute = function handleIsomorphicRoute(req, res) {
  var config;
  client.getConfig()
    .then((c) => config = c)
    .then(() => {
      const match = matchBestRoute(req.url, generateRoutes(config));
      if(match) {
        renderLayout(res.status(200), {
          content: req.url
        });
      } else {
        renderLayout(res.status(404), {
          content: "Not Found"
        });
      }
    })
}
