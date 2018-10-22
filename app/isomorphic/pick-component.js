import { PAGE_TYPE } from "./constants";

export const COMPONENTS = {
  [PAGE_TYPE.HOME_PAGE]: {chunk: "list", component: "HomePage"},
  [PAGE_TYPE.SECTION_PAGE]: {chunk: "list", component: "SectionPage"},
  [PAGE_TYPE.TAG_PAGE]: {chunk: "list", component: "TagPage"},
  [PAGE_TYPE.SEARCH_PAGE]: {chunk: "list", component: "SearchPage"},
  [PAGE_TYPE.STORY_PAGE]: {chunk: "story", component: "StoryPage"},
  [PAGE_TYPE.CATALOG_PAGE]: {chunk: "list", component: "CatalogPage"},
  [PAGE_TYPE.STORY_PREVIEW]: {chunk: "story", component: "StoryPagePreview"},
  [PAGE_TYPE.STORY_PUBLIC_PREVIEW_PAGE]: {chunk: "story", component: "StoryPage"},
  [PAGE_TYPE.HOME_PREVIEW]: {chunk: "list", component: "HomePagePreview"},
  "default": {chunk: "list", component: "NotFoundPage"},
}

function importChunk(chunkName) {
  switch(chunkName) {
    case 'list': return import(/* webpackChunkName: "list" */ './component-bundles/list.js');
    case 'story': return import(/* webpackChunkName: "story" */ './component-bundles/story.js');
  }
}

export function getChunkName(pageType) {
  const {chunk, component} = COMPONENTS[pageType] || COMPONENTS["default"];
  return chunk;
}

export function pickComponent(pageType) {
  const {chunk, component} = COMPONENTS[pageType] || COMPONENTS["default"];
  return importChunk(chunk).then(chunk => chunk[component]);
}
