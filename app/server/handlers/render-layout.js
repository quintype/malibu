/* eslint-disable object-shorthand */
import { ChunkExtractor } from "@loadable/server";
import { assetPath, getAllChunks, readAsset } from "@quintype/framework/server/asset-helper";
import { renderReduxComponent } from "@quintype/framework/server/render";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import serialize from "serialize-javascript";
import { BreakingNewsView } from "../../isomorphic/components/breaking-news-view";
import { Header } from "../../isomorphic/components/header1";
import { Footer } from "../../isomorphic/components/layouts/footer";
import { getChunkName } from "../../isomorphic/pick-component";
import fontFace from "../font";

const statsFile = path.resolve("stats.json");
const cssContent = assetPath("app.css") ? readAsset("app.css") : "";
const fontJsContent = assetPath("font.js") ? readAsset("font.js") : "";
const allChunks = getAllChunks("list", "story");

function renderLoadableReduxComponent(Component, store, extractor, props) {
  const comp = extractor.collectChunks(React.createElement(Provider, { store }, React.createElement(Component, props)));
  const string = ReactDOMServer.renderToString(comp);
  return string;
}

export async function renderLayout(res, params) {
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["header"] });
  const header = renderLoadableReduxComponent(Header, params.store, extractor);
  const chunk = params.shell ? null : allChunks[getChunkName(params.pageType)];
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
        metaTags: params.seoTags ? params.seoTags.toString() : "",
        pageChunk: chunk,
        store: params.store,
        shell: params.shell,
        serialize
      },
      params
    )
  );
}
