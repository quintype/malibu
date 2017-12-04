import compression from 'compression';
import express from 'express';
export const app = express();

import {initializeAllClients} from "@quintype/framework/server/api-client";
import {upstreamQuintypeRoutes, isomorphicRoutes} from "@quintype/framework/server/routes";

import {generateRoutes} from './routes';
import {renderLayout} from "./handlers/render-layout";
import {loadData, loadErrorData} from "./load-data";
import {pickComponent} from "../isomorphic/pick-component";
import SEO from "./SEO";

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
