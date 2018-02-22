/* eslint-disable object-shorthand */
import {assetPath, readAsset} from "@quintype/framework/server/asset-helper";

const cssContent = assetPath("app.css") ? readAsset("app.css") : "";

export function renderLayout(res, params){
  res.render("pages/layout", Object.assign({
    assetPath: assetPath,
    content: "",
    cssContent: cssContent,
    contentTemplate: null,
    title: params.title,
    disableAjaxNavigation: false,
    metaTags: params.seoTags ? params.seoTags.toString() : ""
  }, params))
}
