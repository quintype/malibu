import _ from "lodash";
import {assetPath} from "@quintype/framework/server/asset-helper";

export function renderLayout(res, params){
  res.render("pages/layout", _.extend({
    assetPath: assetPath,
    content: "",
    title: "Sample Application",
    metadata : []
  }, params))
}
