/* eslint-disable no-unused-vars */
import { Collection } from "@quintype/framework/server/api-client";

export async function loadHomePageData(client, config, slug, publisherAttributes) {
  const collection = await Collection.getCollectionBySlug(
    client,
    slug,
    { "item-type": "collection" },
    publisherAttributes.options
  );
  return {
    collection: collection.asJson(),
    cacheKeys: collection.cacheKeys(config["publisher-id"])
  };
}
