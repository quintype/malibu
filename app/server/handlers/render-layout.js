/* eslint-disable object-shorthand */
import {
  assetPath,
  readAsset,
  getAllChunks
} from "@quintype/framework/server/asset-helper";
import { getChunkName } from "../../isomorphic/pick-component";
import {renderReduxComponent} from "@quintype/framework/server/render";
import { NavigationComponent } from "../../isomorphic/components/navigation-component";
import Footer from '../../isomorphic/components/layouts/footer';

const cssContent = assetPath('app.css') ? readAsset('app.css') : ''
const allChunks = getAllChunks('list', 'story')

export function renderLayout (res, params) {
  const chunk = params.shell ? null : allChunks[getChunkName(params.pageType)]

  res.render(
    'pages/layout',
    Object.assign(
      {
        assetPath: assetPath,
        content: '',
        cssContent: cssContent,
        contentTemplate: null,
        title: params.title,
        navbar: renderReduxComponent(NavigationComponent, params.store),
        footer: renderReduxComponent(Footer, params.store),
        disableAjaxNavigation: false,
        metaTags: params.seoTags ? params.seoTags.toString() : '',
        pageChunk: chunk
      },
      params
    )
  )
}
