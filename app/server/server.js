const compression = require('compression');
const express = require('express');
const app = express();

const {initializeAllClients} = require("@quintype/framework/server/api-client");
const {upstreamQuintypeRoutes, isomorphicRoutes} = require("@quintype/framework/server/routes");

const {generateRoutes} = require('./routes');
const {renderLayout} = require("./handlers/render-layout");
const {loadData, loadErrorData} = require("./load-data");
const {pickComponent} = require("../isomorphic/pick-component");
const SEO = require("./SEO");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(compression());
upstreamQuintypeRoutes(app);

isomorphicRoutes(app, {
  logError: (error) => console.error(error),
  generateRoutes: generateRoutes,
  loadData: loadData,
  pickComponent: pickComponent,
  renderLayout: renderLayout,
  loadErrorData: loadErrorData,
  loadSeoData: (config, pageType, data) => new SEO(config, data).getMetaTags(pageType)
});

module.exports = function startApp() {
  return initializeAllClients()
    .then(function() {
       app.listen(3000, function () {
         console.log('Example app listening on port 3000!');
       });
    });
}
