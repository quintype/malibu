const _ = require("lodash");

const {loadHomePageData} = require("./data-loaders/home-page-data");
const {loadStoryPageData} = require("./data-loaders/story-page-data");
const {loadSectionPageData} = require("./data-loaders/section-page-data");

const WHITELIST_CONFIG_KEYS = ['cdn-image'];

function loadData(pageType, params, config) {
  function _loadData() {
    switch (pageType) {
      case "home-page": return loadHomePageData();
      case "story-page": return loadStoryPageData(params);
      case "section-page": return loadSectionPageData(params);
      default: return Promise.resolve({stories: [{headline: "Foobar"}]})
    }
  }

  return _loadData()
    .then((data) => ({pageType: pageType, data: data, config: _.pick(config, WHITELIST_CONFIG_KEYS)}));
}

exports.loadData = loadData;
