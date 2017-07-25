const compression = require('compression');
const express = require('express');

const app = express();
const client = require("quintype-toddy-libs/server/api-client");
const {upstreamQuintypeRoutes, isomorphicRoutes, withConfig} = require("quintype-toddy-libs/server/routes");
const {generateRoutes} = require('./routes');

const {renderLayout} = require("./handlers/render-layout");
const {handleIsomorphicRoute, loadData} = require("./handlers/handle-isomorphic-route");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(compression());
upstreamQuintypeRoutes(app);
isomorphicRoutes(app, {
  logError: (error) => console.error(error),
  generateRoutes: generateRoutes,
  renderLayout: renderLayout,
  loadData: loadData,
});
app.get("/*", withConfig(null, handleIsomorphicRoute));

module.exports = function startApp() {
  return client.getConfig()
    .then(function() {
       app.listen(3000, function () {
         console.log('Example app listening on port 3000!');
       });
    });
}
