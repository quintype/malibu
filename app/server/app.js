const compression = require('compression');
const express = require('express');
const app = express();

const {initializeAllClients} = require("@quintype/framework/server/api-client");
const {upstreamQuintypeRoutes, isomorphicRoutes} = require("@quintype/framework/server/routes");

const {generateRoutes} = require('./routes');
const {renderLayout} = require("./handlers/render-layout");
const {loadData, loadErrorData} = require("./load-data");
const {pickComponent} = require("../isomorphic/pick-component");
const {SEO, StaticTags} = require("@quintype/seo");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(compression());
upstreamQuintypeRoutes(app);

const STATIC_TAGS = {
  "twitter:site": "Quintype",
  "twitter:domain": "quintype.com",
  "twitter:app:name:ipad": undefined,
  "twitter:app:name:googleplay": undefined,
  "twitter:app:id:googleplay": undefined,
  "twitter:app:name:iphone": undefined,
  "twitter:app:id:iphone": undefined,
  "apple-itunes-app": undefined,
  "google-play-app": undefined,
  "fb:app_id": undefined,
  "fb:pages": undefined,
  "og:site_name": "Quintype"
};

isomorphicRoutes(app, {
  logError: (error) => console.error(error),
  generateRoutes: generateRoutes,
  loadData: loadData,
  pickComponent: pickComponent,
  renderLayout: renderLayout,
  loadErrorData: loadErrorData,
  seo: new SEO({
    generators: [StaticTags],
    staticTags: STATIC_TAGS
  })
});

module.exports = app;
