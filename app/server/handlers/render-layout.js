import _ from "lodash";
import { assetPath } from "@quintype/framework/server/asset-helper";

export function renderLayout(res, params) {
  res.render(
    "pages/layout",
    _.extend(
      {
        assetPath,
        content: "",
        contentTemplate: null,
        title: params.title ? params.title : "Sample Application",
        disableAjaxNavigation: false,
        metaTags: params.seoTags ? params.seoTags.toString() : ""
      },
      params
    )
  );
}
