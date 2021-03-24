/* eslint-disable object-shorthand */
import { ChunkExtractor } from "@loadable/server";
import path from "path";
import serialize from "serialize-javascript";
import get from "lodash/get";

import { assetPath, readAsset, getAllChunks } from "@quintype/framework/server/asset-helper";
import { renderReduxComponent, renderLoadableReduxComponent } from "@quintype/framework/server/render";

import { getChunkName } from "../../isomorphic/pick-component";
import { Header } from "../../isomorphic/components/layouts/header";
import { NavBar } from "../../isomorphic/components/layouts/header/nav-bar";
import { Footer } from "../../isomorphic/components/layouts/footer";
import fontFace from "../font";
import { BreakingNewsView } from "../../isomorphic/components/breaking-news-view";

const statsFile = path.resolve("stats.json");
const cssContent = assetPath("app.css") ? readAsset("app.css") : "";
const fontJsContent = assetPath("font.js") ? readAsset("font.js") : "";
const allChunks = getAllChunks("list", "story");

const getConfig = state => {
  return {
    gtmId: get(state, ["qt", "config", "publisher-attributes", "google_tag_manager", "id"], ""),
    isGtmEnable: get(state, ["qt", "config", "publisher-attributes", "google_tag_manager", "is_enable"], false),
    gaId: get(state, ["qt", "config", "publisher-attributes", "google_analytics", "id"], ""),
    isGaEnable: get(state, ["qt", "config", "publisher-attributes", "google_analytics", "is_enable"], false),
    cdnImage: get(state, ["qt", "config", "cdn-image"], "")
  };
};

const extractor = new ChunkExtractor({
  statsFile,
  entrypoints: ["topbar", "navbar", "footer"]
});
export const getCriticalCss = async () => {
  const criticalCss = await extractor.getCssString();
  return criticalCss.trim();
};

export async function renderLayout(res, params) {
  const chunk = params.shell ? null : allChunks[getChunkName(params.pageType)];
  const { gtmId, gaId, cdnImage, isGtmEnable, isGaEnable } = getConfig(params.store.getState());
  const criticalCss = await getCriticalCss();

  res.render(
    "pages/layout",
    Object.assign(
      {
        assetPath: assetPath,
        content: "",
        cssContent: cssContent,
        criticalCss: criticalCss,
        fontJsContent: fontJsContent,
        fontFace: fontFace,
        contentTemplate: null,
        title: params.title,
        topbar: renderLoadableReduxComponent(Header, params.store, extractor),
        navbar: renderLoadableReduxComponent(NavBar, params.store, extractor),
        footer: renderLoadableReduxComponent(Footer, params.store, extractor),
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
