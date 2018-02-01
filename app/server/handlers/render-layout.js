import _ from "lodash";
import {assetPath, readAsset} from "@quintype/framework/server/asset-helper";

const cssContent = assetPath("app.css") ? readAsset("app.css") : "";

export function renderLayout(res, params){
  res.render("pages/layout", _.extend({
    assetPath: assetPath,
    content: "",
    cssContent: cssContent,
    contentTemplate: null,
    title: params.title,
    disableAjaxNavigation: false,
    title: "Sample Application",
    metaTags: params.seoTags ? params.seoTags.toString() : ""
  }, params))
}
