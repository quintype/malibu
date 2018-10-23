/* eslint-disable object-shorthand */
import { assetPath, readAsset, assetFiles, getChunk } from "@quintype/framework/server/asset-helper";
import { COMPONENTS, getChunkName } from '../../isomorphic/pick-component';

const cssContent = assetPath("app.css") ? readAsset("app.css") : "";

function loadChunk(acc, {chunk}) {
  acc[chunk] = acc[chunk] || getChunk(chunk);
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
