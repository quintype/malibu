/* eslint-disable no-unused-vars */
import { Collection } from "@quintype/framework/server/api-client";

export async function loadHomePageData(client, config, slug, collectionParams) {
  const collection = await Collection.getCollectionBySlug(
    client,
    slug,
    { "item-type": "collection" },
    collectionParams
  );
  return {
    collection: collection.asJson(),
    cacheKeys: collection.cacheKeys(config["publisher-id"])
  };
}
