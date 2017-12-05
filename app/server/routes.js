import {generateStoryPageRoutes, generateSectionPageRoutes} from "@quintype/framework/server/generate-routes";
import { PAGE_TYPE } from "../isomorphic/constants";

const STATIC_ROUTES = [
  {path: "/", pageType: PAGE_TYPE.HOME_PAGE, exact: true},
  {path: "/preview/story", pageType: PAGE_TYPE.STORY_PREVIEW, exact: true},
  {path: "/preview/story/:encryptedKey", pageType: PAGE_TYPE.STORY_PUBLIC_PREVIEW_PAGE, exact: true},
  {path: "/preview/home", pageType: PAGE_TYPE.HOME_PREVIEW, exact: true},
  {path: "/topic/:tagSlug", pageType: PAGE_TYPE.TAG_PAGE, exact: true},
  {path: "/search", pageType: PAGE_TYPE.SEARCH_PAGE, exact: true},
  {path: "/about-us", pageType: PAGE_TYPE.ABOUT_US, exact: true, skipPWA: true}
];

function generateRoutes(config) {
  return STATIC_ROUTES.concat(generateSectionPageRoutes(config, {addSectionPrefix: true}), generateStoryPageRoutes(config));
}

export { generateRoutes };
