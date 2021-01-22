import { Collection } from "@quintype/framework/server/api-client";

export function loadCollectionPageData(client, collectionSlug, config) {
  return Collection.getCollectionBySlug(client, collectionSlug, { limit: 20 }, { depth: 2 }).then(collection => {
    return {
      collection: (collection && collection.asJson()) || {},
      cacheKeys: collection && collection.cacheKeys(config["publisher-id"])
    };
  });
}
