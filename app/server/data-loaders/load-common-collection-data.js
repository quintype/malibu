/* eslint-disable no-unused-vars */
import { Collection } from "@quintype/framework/server/api-client";

export async function loadCommonCollectionData({ client, config, slug, collectionParams, depthParams }) {
  return await Collection.getCollectionBySlug(client, slug, collectionParams, depthParams).then(collection => {
    return {
      collection: collection.asJson(),
      cacheKeys: collection.cacheKeys(config["publisher-id"])
    };
  });
}
