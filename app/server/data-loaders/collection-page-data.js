import { Collection } from "@quintype/framework/server/api-client";

export function loadCollectionPageData(client, collectionSlug, config, res, req) {
  return Collection.getCollectionBySlug(client, collectionSlug, { limit: 24 }, { depth: 2 }).then(collection => {
    if (collection.template === "section") {
      res.redirect(301, `/${collectionSlug}`);
    }

    if (collection.template === "author") {
      res.redirect(301, `/author/${collectionSlug}`);
    }
    return {
      collection: (collection && collection.asJson()) || {},
      cacheKeys: collection && collection.cacheKeys(config["publisher-id"])
    };
  });
}
