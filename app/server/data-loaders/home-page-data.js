/* eslint-disable no-unused-vars */
import { Story, Collection } from "@quintype/framework/server/api-client";
import { homeCollectionOrStories } from "@quintype/framework/server/data-loader-helpers";

export function loadHomePageData(client, config) {
  return homeCollectionOrStories(client)
    .then(collection => ({
      collection: collection.asJson(),
      cacheKeys: collection.cacheKeys(config['publisher-id'])
    }));
}
