/* eslint-disable no-console, no-unused-vars */

import compression from "compression";
import express from "express";
import { SEO } from "@quintype/seo";
import { initializeAllClients } from "@quintype/framework/server/api-client";
import {
  upstreamQuintypeRoutes,
  isomorphicRoutes,
  staticRoutes
} from "@quintype/framework/server/routes";
import { generateRoutes, STATIC_ROUTES } from "./routes";
import { renderLayout } from "./handlers/render-layout";
import { loadData, loadErrorData } from "./load-data";
import { pickComponent } from "../isomorphic/pick-component";

export const app = express();

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

const STRUCTURED_DATA = {
  organization: {
    name: "Quintype",
    url: "http://www.quintype.com/",
    logo: "https://quintype.com/logo.png",
    sameAs: [
      "https://www.facebook.com/quintype",
      "https://twitter.com/quintype_in",
      "https://plus.google.com/+quintype",
      "https://www.youtube.com/user/Quintype"
    ]
  }
};

isomorphicRoutes(app, {
  logError: error => console.error(error),
  generateRoutes,
  loadData,
  pickComponent,
  renderLayout,
  loadErrorData,
  staticRoutes: STATIC_ROUTES,
  seo: new SEO({
    staticTags: STATIC_TAGS,
    enableTwitterCards: true,
    enableOgTags: true,
    enableNews: true,
    structuredData: STRUCTURED_DATA
  })
});
