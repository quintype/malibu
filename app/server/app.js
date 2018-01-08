import createApp from '@quintype/framework/server/create-app';

import {initializeAllClients} from "@quintype/framework/server/api-client";
import {upstreamQuintypeRoutes, isomorphicRoutes, staticRoutes} from "@quintype/framework/server/routes";
import {generateRoutes, STATIC_ROUTES} from './routes';
import {renderLayout} from "./handlers/render-layout";
import {loadData, loadErrorData} from "./load-data";
import {pickComponent} from "../isomorphic/pick-component";
import seo from "./seo";

export const app = createApp();

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
