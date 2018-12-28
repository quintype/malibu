/* eslint-disable object-shorthand */
import { assetPath, readAsset, getAllChunks } from "@quintype/framework/server/asset-helper";
import { getChunkName } from "../../isomorphic/pick-component";
import { renderReduxComponent } from "@quintype/framework/server/render";
import { Header } from "../../isomorphic/components/header";
import { Footer } from "../../isomorphic/components/layouts/footer";
import fontFace from "../font";
import { BreakingNewsView } from "../../isomorphic/components/breaking-news-view";

const cssContent = assetPath("app.css") ? readAsset("app.css") : "";
const fontJsContent = assetPath("font.js") ? readAsset("font.js") : "";
const allChunks = getAllChunks("list", "story");

export function renderLayout(res, params) {
  const chunk = params.shell ? null : allChunks[getChunkName(params.pageType)];

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
        metaTags: params.seoTags ? params.seoTags.toString() : "",
        pageChunk: chunk,
        store: params.store
      },
      params
    )
  );
}
