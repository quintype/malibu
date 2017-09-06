const {PAGE_TYPE} = require("./constants");
const {HomeSeo, SectionSeo, StorySeo} = require("quintype-seo-node");

module.exports = class SEO {

  constructor(config, seoParams) {
    this._config = config;
    this._seoParams = seoParams;
  }

  getMetaTags(pageType) {
    let metaTags = [];
    let config = this._config;
    let seoParams = this._seoParams;

    let pageSEO = {};

    pageSEO[PAGE_TYPE.HOME_PAGE] = function () {
      return new HomeSeo(config);
    };

    pageSEO[PAGE_TYPE.SECTION_PAGE] = function () {
      return new SectionSeo(config, seoParams.section);
    };

    pageSEO[PAGE_TYPE.STORY_PAGE] = function () {
      return new StorySeo(config, seoParams.story);
    };

    if (pageSEO.hasOwnProperty(pageType)) {
      return pageSEO[pageType]().getMetaTags();
    }

    return metaTags;
  }
}