/* eslint-disable no-unused-vars */
import { Collection } from "@quintype/framework/server/api-client";

export async function loadHomePageData(client, config) {
  const collection = await Collection.getCollectionBySlug(client, "home", { "item-type": "collection" }, { depth: 1 });
  return {
    collection: collection.asJson(),
    cacheKeys: collection.cacheKeys(config["publisher-id"])
  };
}
