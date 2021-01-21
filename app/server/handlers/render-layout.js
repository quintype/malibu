/* eslint-disable object-shorthand */
import { assetPath, readAsset, getAllChunks } from "@quintype/framework/server/asset-helper";
import get from "lodash/get";
import { getChunkName } from "../../isomorphic/pick-component";
import { renderReduxComponent } from "@quintype/framework/server/render";
import { Header } from "../../isomorphic/components/header";
import { Footer } from "../../isomorphic/components/layouts/footer";
import fontFace from "../font";
import { BreakingNewsView } from "../../isomorphic/components/breaking-news-view";
import serialize from "serialize-javascript";
const cssContent = assetPath("app.css") ? readAsset("app.css") : "";
const fontJsContent = assetPath("font.js") ? readAsset("font.js") : "";
const allChunks = getAllChunks("list", "story");

const getConfig = state => {
  // get onesignal config
  return {
    gtmId: get(state, ["qt", "config", "publisher-attributes", "google_tag_manager", "id"], ""),
    gaId: get(state, ["qt", "config", "publisher-attributes", "google_analytics", "id"], ""),
    cdnImage: get(state, ["qt", "config", "cdn-image"], ""),
    oneSignalSafariId: get(state, ["qt", "config", "publisher-attributes", "onesignal", "safari_web_id"], null),
    isOnesignalEnable: get(state, ["qt", "config", "publisher-attributes", "onesignal", "is_enable"], false),
    oneSignalAppId: get(state, ["qt", "config", "public-integrations", "one-signal", "app-id"], null)
  };
};

export function renderLayout(res, params) {
  const chunk = params.shell ? null : allChunks[getChunkName(params.pageType)];
  const { gtmId, gaId, cdnImage, oneSignalSafariId, isOnesignalEnable, oneSignalAppId } = getConfig(
    params.store.getState()
  );
  res.render(
    "pages/layout",
    Object.assign(
      {
        assetPath: assetPath,
        content: "",
        cssContent: cssContent,
        fontJsContent: fontJsContent,
        fontFace: fontFace,
        contentTemplate: null,
        title: params.title,
        navbar: renderReduxComponent(Header, params.store),
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
        oneSignalAppId,
        oneSignalSafariId,
        isOnesignalEnable
      },
      params
    )
  );
}
