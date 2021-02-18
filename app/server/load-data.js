/* eslint-disable no-underscore-dangle, no-undef, no-unused-vars, object-shorthand, arrow-body-style  */
import pick from "lodash/pick";
import get from "lodash/get";
import publisher from "@quintype/framework/server/publisher-config";
import { catalogDataLoader } from "@quintype/framework/server/data-loader-helpers";

import { loadHomePageData } from "./data-loaders/home-page-data";
import { loadStoryPageData, loadStoryPublicPreviewPageData } from "./data-loaders/story-page-data";
import { loadSectionPageData } from "./data-loaders/section-page-data";
import { loadTagPageData } from "./data-loaders/tag-page-data";
import { loadSearchPageData } from "./data-loaders/search-page-data";
import { loadFormPageData } from "./data-loaders/form-page-data";
import { getNavigationMenuArray } from "./data-loaders/menu-data";
import { loadCollectionPageData } from "./data-loaders/collection-page-data";
import { loadAuthorPageData } from "./data-loaders/author-page-data";
import { PAGE_TYPE } from "../isomorphic/constants";

const WHITELIST_CONFIG_KEYS = [
  "cdn-image",
  "polltype-host",
  "layout",
  "sections",
  "social-links",
  "publisher-name",
  "public-integrations",
  "sketches-host",
  "publisher-settings"
];

export function getPublisherAttributes(publisherYml = publisher) {
  const publisherAttributes = get(publisherYml, ["publisher"], {});
  return publisherAttributes;
}

export function loadErrorData(error, config) {
  const publisherAttributes = getPublisherAttributes();
  const errorComponents = { 404: "not-found" };
  return Promise.resolve({
    data: {
      navigationMenu: getNavigationMenuArray(config.layout.menu, config.sections)
    },
    config: Object.assign(pick(config.asJson(), WHITELIST_CONFIG_KEYS), {
      "publisher-attributes": publisherAttributes
    }),
    pageType: errorComponents[error.httpStatusCode],
    httpStatusCode: error.httpStatusCode || 500
  });
}

// FIXME: Convert this to async/await
export function loadData(pageType, params, config, client, { host, next, domainSlug }) {
  const publisherAttributes = getPublisherAttributes();
  function _loadData() {
    switch (pageType) {
      case PAGE_TYPE.HOME_PAGE:
        return loadHomePageData(client, config, params.collectionSlug);
      case PAGE_TYPE.HOME_PREVIEW:
        return loadHomePageData(client, config);
      case PAGE_TYPE.SECTION_PAGE:
        return loadSectionPageData(client, params.sectionId, config, publisherAttributes);
      case PAGE_TYPE.COLLECTION_PAGE:
        return loadCollectionPageData(client, params.collectionSlug, config);
      case PAGE_TYPE.TAG_PAGE:
        return loadTagPageData(client, params.tagSlug, config);
      case PAGE_TYPE.STORY_PAGE:
        return loadStoryPageData(client, params, config, next);
      case PAGE_TYPE.CATALOG_PAGE:
        return catalogDataLoader(client, config);
      case PAGE_TYPE.STORY_PUBLIC_PREVIEW_PAGE:
        return loadStoryPublicPreviewPageData(client, params, config);
      case PAGE_TYPE.STATIC_PAGE:
        return Promise.resolve({ cacheKeys: ["static"] });
      case PAGE_TYPE.SEARCH_PAGE:
        return loadSearchPageData(client, params.q, config);
      case PAGE_TYPE.FORM_PAGE:
        return loadFormPageData(client, params.formSlug, next);
      case PAGE_TYPE.AUTHOR_PAGE:
        return loadAuthorPageData(client, params.authorSlug, config);
      default:
        return Promise.resolve({ error: { message: "No Loader" } });
    }
  }

  return _loadData().then(data => {
    return {
      httpStatusCode: data.httpStatusCode || 200,
      pageType: data.pageType || pageType,
      data: Object.assign({}, data, {
        navigationMenu: getNavigationMenuArray(config.layout.menu, config.sections),
        timezone: publisherAttributes.timezone || null
      }),
      config: Object.assign(pick(config.asJson(), WHITELIST_CONFIG_KEYS), {
        "publisher-attributes": publisherAttributes,
        "image-cdn-format": "gumlet"
      })
    };
  });
}
