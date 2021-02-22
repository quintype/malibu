/* eslint-disable object-shorthand */
import React from "react";
import { ChunkExtractor } from "@loadable/server";
import path from "path";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { assetPath, readAsset, getAllChunks } from "@quintype/framework/server/asset-helper";
import get from "lodash/get";
import { getChunkName } from "../../isomorphic/pick-component";
import { renderReduxComponent } from "@quintype/framework/server/render";
import { Header } from "../../isomorphic/components/header";
import { Footer } from "../../isomorphic/components/layouts/footer";
import fontFace from "../font";
import { BreakingNewsView } from "../../isomorphic/components/breaking-news-view";
import serialize from "serialize-javascript";

const statsFile = path.resolve("stats.json");
const cssContent = assetPath("app.css") ? readAsset("app.css") : "";
const fontJsContent = assetPath("font.js") ? readAsset("font.js") : "";
const allChunks = getAllChunks("list", "story");

function renderLoadableReduxComponent(Component, store, extractor, props) {
  const comp = extractor.collectChunks(React.createElement(Provider, { store }, React.createElement(Component, props)));
  const string = ReactDOMServer.renderToString(comp);

  return string;
}

const getConfig = state => {
  return {
    gtmId: get(state, ["qt", "config", "publisher-attributes", "google_tag_manager", "id"], ""),
    isGtmEnable: get(state, ["qt", "config", "publisher-attributes", "google_tag_manager", "is_enable"], false),
    gaId: get(state, ["qt", "config", "publisher-attributes", "google_analytics", "id"], ""),
    isGaEnable: get(state, ["qt", "config", "publisher-attributes", "google_analytics", "is_enable"], false),
    cdnImage: get(state, ["qt", "config", "cdn-image"], "")
  };
};

export async function renderLayout(res, params) {
  const chunk = params.shell ? null : allChunks[getChunkName(params.pageType)];
  const { gtmId, gaId, cdnImage, isGtmEnable, isGaEnable } = getConfig(params.store.getState());
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["headercss"]});
  const header = renderLoadableReduxComponent(Header, params.store, extractor);
  const criticalCss = await extractor.getCssString();
  res.render(
    "pages/layout",
    Object.assign(
      {
        assetPath: assetPath,
        content: "",
        cssContent: cssContent,
        criticalCss,
        fontJsContent: fontJsContent,
        fontFace: fontFace,
        contentTemplate: null,
        title: params.title,
        navbar: header,
        footer: renderReduxComponent(Footer, params.store),
        breakingNews: renderReduxComponent(BreakingNewsView, params.store, {
          breakingNews: [],
          breakingNewsLoaded: false
        }),
        disableAjaxNavigation: false,
        gtmId,
        gaId,
        cdnImage,
        metaTags: params.seoTags ? params.seoTags.toString() : "",
        pageChunk: chunk,
        store: params.store,
        shell: params.shell,
        serialize,
        isGtmEnable,
        isGaEnable
      },
      params
    )
  );
}
