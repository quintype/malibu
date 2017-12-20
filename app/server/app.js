import compression from 'compression';
import express from 'express';

import {initializeAllClients} from "@quintype/framework/server/api-client";
import {upstreamQuintypeRoutes, isomorphicRoutes, staticRoutes} from "@quintype/framework/server/routes";
import {generateRoutes, STATIC_ROUTES} from './routes';
import {renderLayout} from "./handlers/render-layout";
import {loadData, loadErrorData} from "./load-data";
import {pickComponent} from "../isomorphic/pick-component";
import seo from "./seo";

export const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(compression());
upstreamQuintypeRoutes(app, {forwardAmp: true});

isomorphicRoutes(app, {
  logError: (error) => console.error(error),
  generateRoutes: generateRoutes,
  loadData: loadData,
  pickComponent: pickComponent,
  renderLayout: renderLayout,
  loadErrorData: loadErrorData,
  staticRoutes: STATIC_ROUTES,
  seo: seo
});
