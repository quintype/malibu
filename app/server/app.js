/* eslint-disable no-console, no-unused-vars, import/extensions, object-shorthand, global-require */
import createApp from "@quintype/framework/server/create-app";
import logger from "@quintype/framework/server/logger";
import {
  upstreamQuintypeRoutes,
  isomorphicRoutes,
  staticRoutes,
  getWithConfig
} from "@quintype/framework/server/routes";
import { generateRoutes, STATIC_ROUTES } from "./routes";
import { renderLayout } from "./handlers/render-layout";
import { loadData, loadErrorData } from "./load-data";
import { pickComponent } from "../isomorphic/pick-component";
import { SEO } from "@quintype/seo";
import { Collection } from "@quintype/framework/server/api-client";
export const app = createApp();

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
  preloadJs: true,
  prerenderServiceUrl: "https://prerender.quintype.io"
});
