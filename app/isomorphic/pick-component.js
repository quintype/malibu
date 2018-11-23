import { PAGE_TYPE } from "./constants";
import { pickComponentHelper } from "@quintype/framework/server/pick-component-helper";

const { pickComponent, getChunkName } = pickComponentHelper(
  {
    [PAGE_TYPE.HOME_PAGE]: { chunk: "list", component: "HomePage" },
    [PAGE_TYPE.SECTION_PAGE]: { chunk: "list", component: "SectionPage" },
    [PAGE_TYPE.TAG_PAGE]: { chunk: "list", component: "TagPage" },
    [PAGE_TYPE.SEARCH_PAGE]: { chunk: "list", component: "SearchPage" },
    [PAGE_TYPE.STORY_PAGE]: { chunk: "story", component: "StoryPage" },
    [PAGE_TYPE.CATALOG_PAGE]: { chunk: "list", component: "CatalogPage" },
    [PAGE_TYPE.STORY_PREVIEW]: { chunk: "story", component: "StoryPagePreview" },
    [PAGE_TYPE.STORY_PUBLIC_PREVIEW_PAGE]: { chunk: "story", component: "StoryPage" },
    [PAGE_TYPE.HOME_PREVIEW]: { chunk: "list", component: "HomePagePreview" },
    default: { chunk: "list", component: "NotFoundPage" }
  },
  {
    list: () => import(/* webpackChunkName: "list" */ "./component-bundles/list.js"),
    story: () => import(/* webpackChunkName: "story" */ "./component-bundles/story.js")
  }
);

export { pickComponent, getChunkName };
