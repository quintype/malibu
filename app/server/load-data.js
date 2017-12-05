import _ from "lodash";

import {loadHomePageData} from "./data-loaders/home-page-data";
import {loadStoryPageData} from "./data-loaders/story-page-data";
import {loadStoryPublicPreviewPageData} from "./data-loaders/story-public-preview-page-data";
import {loadSectionPageData} from "./data-loaders/section-page-data";
import {loadTagPageData} from "./data-loaders/tag-page-data";
import {loadSearchPageData} from "./data-loaders/search-page-data";
import {PAGE_TYPE} from "../isomorphic/constants";

const WHITELIST_CONFIG_KEYS = ['cdn-image', 'polltype-host', 'layout'];

function loadErrorData(error) {
  const errorComponents = { 404 : "not-found" };
  return Promise.resolve({
    data: null,
    config: _.pick(config, WHITELIST_CONFIG_KEYS),
    pageType : errorComponents[error.httpStatusCode]
  })
}

function loadData(pageType, params, config, client) {
  function _loadData() {
    switch (pageType) {
      case PAGE_TYPE.HOME_PAGE: return loadHomePageData(client, config);
      case PAGE_TYPE.SECTION_PAGE: return loadSectionPageData(client, params.sectionId, config);
      case PAGE_TYPE.TAG_PAGE: return loadTagPageData(client, params.tagSlug, config);
      case PAGE_TYPE.SECTION_PAGE: return loadSearchPageData(client, params.q, config);
      case PAGE_TYPE.STORY_PAGE: return loadStoryPageData(client, params, config);
      case PAGE_TYPE.STORY_PUBLIC_PREVIEW_PAGE: return loadStoryPublicPreviewPageData(client, params, config);
      default: return Promise.resolve({error: {message: "No Loader"}})
    }
  }

  return _loadData()
    .then((data) => {
      return {
        httpStatusCode : 200,
        pageType: pageType,
        data: data,
        config: _.pick(config, WHITELIST_CONFIG_KEYS)
      };
    });
}

export { loadData };
