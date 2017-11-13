const _ = require("lodash");

const {loadHomePageData} = require("./data-loaders/home-page-data");
const {loadStoryPageData} = require("./data-loaders/story-page-data");
const {loadStoryPublicPreviewPageData} = require("./data-loaders/story-public-preview-page-data");
const {loadSectionPageData} = require("./data-loaders/section-page-data");
const {loadTagPageData} = require("./data-loaders/tag-page-data");
const {loadSearchPageData} = require("./data-loaders/search-page-data");
const {PAGE_TYPE} = require("./constants");

const WHITELIST_CONFIG_KEYS = ['cdn-image'];

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
      case PAGE_TYPE.SECTION_PAGE: return loadSearchPageData(client, params.searchQuery, config);
      case PAGE_TYPE.STORY_PAGE: return loadStoryPageData(client, params, config);
      case PAGE_TYPE.STORY_PUBLIC_PREVIEW_PAGE: return loadStoryPublicPreviewPageData(client, params, config);
      default: return Promise.resolve({stories: [{headline: "Foobar"}]})
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

exports.loadData = loadData;
