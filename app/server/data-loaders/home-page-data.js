/* eslint-disable no-unused-vars */
import { Collection } from "@quintype/framework/server/api-client";
import { getStoryLimits, getNestedCollectionLimit } from "../../isomorphic/components/get-collection-template";

export async function loadHomePageData(client, config, slug) {
  const collection = await Collection.getCollectionBySlug(
    client,
    slug,
    { "item-type": "collection" },
    {
      depth: 2,
      storyLimits: getStoryLimits()
    }
  );
  return {
    collection: collection.asJson(),
    cacheKeys: collection.cacheKeys(config["publisher-id"])
  };
}
