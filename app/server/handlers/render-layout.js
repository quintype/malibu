/* eslint-disable object-shorthand */
import {
  assetPath,
  readAsset,
  getAllChunks
} from '@quintype/framework/server/asset-helper'
import { getChunkName } from '../../isomorphic/pick-component'

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
        disableAjaxNavigation: false,
        metaTags: params.seoTags ? params.seoTags.toString() : '',
        pageChunk: chunk
      },
      params
    )
  )
}
