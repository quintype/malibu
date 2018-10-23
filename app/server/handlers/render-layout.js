/* eslint-disable object-shorthand */
import { assetPath, readAsset, assetFiles } from "@quintype/framework/server/asset-helper";
import { COMPONENTS, getChunkName } from '../../isomorphic/pick-component'

const cssContent = assetPath("app.css") ? readAsset("app.css") : "";

// TODO: Move this inside assetHelper
function loadChunk(acc, {chunk}) {
  acc[chunk] = acc[chunk] || {
    cssPath: assetPath(`${chunk}.css`),
    cssContent: readAsset(`${chunk}.css`),
    jsPaths: [assetPath(`${chunk}.js`), assetPath(`vendors~${chunk}.js`)],
  };
  return acc;
}
const allChunks = Object.values(COMPONENTS).reduce(loadChunk, {});

export function renderLayout(res, params) {
  const chunk = allChunks[getChunkName(params.pageType)];

  res.render(
    "pages/layout",
    Object.assign(
      {
        assetPath: assetPath,
        content: "",
        cssContent: cssContent,
        contentTemplate: null,
        title: params.title,
        disableAjaxNavigation: false,
        metaTags: params.seoTags ? params.seoTags.toString() : "",
        pageChunk: chunk,
      },
      params
    )
  );
}
