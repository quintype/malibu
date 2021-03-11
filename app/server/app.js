/* eslint-disable no-console, no-unused-vars, import/extensions, object-shorthand, global-require */
import { Collection } from "@quintype/framework/server/api-client";
import createApp from "@quintype/framework/server/create-app";
import logger from "@quintype/framework/server/logger";
import { getWithConfig, isomorphicRoutes, upstreamQuintypeRoutes } from "@quintype/framework/server/routes";
import { SEO } from "@quintype/seo";
import { pickComponent } from "../isomorphic/pick-component";
import { renderLayout } from "./handlers/render-layout";
import { loadData, loadErrorData } from "./load-data";
import { generateRoutes, STATIC_ROUTES } from "./routes";
export const app = createApp();

// Add this to the VERY top of the first file loaded in your app
var apm = require("elastic-apm-node").start({
  // Override the service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: "",

  // Use if APM Server requires a secret token
  secretToken: "",

  // Set the custom APM Server URL (default: http://localhost:8200)
  serverUrl: "",

  // Set the service environment
  environment: "production"
});

upstreamQuintypeRoutes(app, { forwardAmp: true });

const STATIC_TAGS = {
  "twitter:site": "Quintype",
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
  },
  enableLiveBlog: true,
  enableVideo: true,
  enableNewsArticle: true
};

const redirectCollectionHandler = () => async (req, res, next, { client, config }) => {
  const response = await Collection.getCollectionBySlug(client, req.params.collectionSlug, { limit: 20 }, { depth: 2 });
  if (!response) {
    return next();
  }
  const collection = response && response.collection;
  if (collection.template === "section") {
    const sectionId = collection.metadata.section[0].id;
    const section = config.sections.find(section => section.id === sectionId) || {};
    return res.redirect(301, `${section["section-url"]}`);
  }

  if (collection.template === "author") {
    return res.redirect(301, `/author/${req.params.collectionSlug}`);
  }
  return next();
};

const logError = error => logger.error(error);

getWithConfig(app, "/collection/:collectionSlug", redirectCollectionHandler(), {
  logError
});

isomorphicRoutes(app, {
  appVersion: require("../isomorphic/app-version"),
  logError: error => logger.error(error),
  generateRoutes: generateRoutes,
  loadData: loadData,
  pickComponent: pickComponent,
  renderLayout: renderLayout,
  templateOptions: true,
  loadErrorData: loadErrorData,
  staticRoutes: STATIC_ROUTES,
  seo: new SEO({
    staticTags: STATIC_TAGS,
    enableTwitterCards: true,
    enableOgTags: true,
    enableNews: true,
    structuredData: STRUCTURED_DATA
  }),
  preloadJs: true
});
