const {PAGE_TYPE} = require("./constants");
const {HomeSeo, SectionSeo, StorySeo} = require("quintype-seo-node");

module.exports = class SEO {

  constructor(config, seoParams) {
    this._config = config;
    this._seoParams = seoParams;
    this._pageSEOObj = this.getPageSEOObj();
  }

  getPageSEOObj() {
    let config = this._config;
    let seoParams = this._seoParams;

    let pageSEOObj = {};
    
    pageSEOObj[PAGE_TYPE.HOME_PAGE] = function () {
      return new HomeSeo(config);
    };

    pageSEOObj[PAGE_TYPE.SECTION_PAGE] = function () {
      return new SectionSeo(config, seoParams.section);
    };

    pageSEOObj[PAGE_TYPE.STORY_PAGE] = function () {
      return new StorySeo(config, seoParams.story);
    };

    return pageSEOObj;
  }

  getMetaTags(pageType) {
    let metaTags = [];

    if (this._pageSEOObj.hasOwnProperty(pageType)) {
      return this._pageSEOObj[pageType]().getMetaTags();
    }

    return metaTags;
  }
}