import _ from "lodash";
import {assetPath} from "@quintype/framework/server/asset-helper";

export function renderLayout(res, params){
  res.render("pages/layout", _.extend({
    assetPath: assetPath,
    content: "",
    contentTemplate: null,
    title: params.title,
    disableAjaxNavigation: false,
    title: "Sample Application",
    metaTags: params.seoTags ? params.seoTags.toString() : ""
  }, params))
}
