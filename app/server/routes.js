import {
  generateStoryPageRoutes,
  generateSectionPageRoutes
} from '@quintype/framework/server/generate-routes'
import { PAGE_TYPE } from '../isomorphic/constants'

// Static Routes are not part of the PWA. Also, they aren't part of the JS bundle
export const STATIC_ROUTES = [
  {
    path: '/about-us',
    pageType: PAGE_TYPE.STATIC_PAGE,
    renderParams: { contentTemplate: './about-us' }
  },
  {
    path: '/preview/story',
    pageType: PAGE_TYPE.STORY_PREVIEW,
    exact: true,
    renderParams: { contentTemplate: './story-preview' },
    disableIsomorphicComponent: false
  },
  {
    path: '/preview/home',
    pageType: PAGE_TYPE.HOME_PREVIEW,
    exact: true,
    renderParams: { contentTemplate: './story-preview' },
    disableIsomorphicComponent: false
  }
]

const ISOMORPHIC_ROUTES = [
  { path: '/', pageType: PAGE_TYPE.HOME_PAGE, exact: true },
  {
    path: '/template-options',
    pageType: PAGE_TYPE.CATALOG_PAGE,
    exact: true,
    skipPWA: true
  },
  {
    path: '/preview/story/:encryptedKey',
    pageType: PAGE_TYPE.STORY_PUBLIC_PREVIEW_PAGE,
    exact: true
  },
  { path: '/topic/:tagSlug', pageType: PAGE_TYPE.TAG_PAGE, exact: true },
  { path: '/search', pageType: PAGE_TYPE.SEARCH_PAGE, exact: true }
]

export function generateRoutes (config) {
  return ISOMORPHIC_ROUTES.concat(
    generateSectionPageRoutes(config, { addSectionPrefix: true }),
    generateStoryPageRoutes(config)
  )
}
