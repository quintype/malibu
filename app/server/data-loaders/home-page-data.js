/* eslint-disable no-unused-vars */
import { Collection } from "@quintype/framework/server/api-client";
import { getStoryLimits } from "../../isomorphic/components/get-collection-template";

export async function loadHomePageData(client, config) {
  const collection = await Collection.getCollectionBySlug(
    client,
    "home",
    { "item-type": "collection" },
    { depth: 1, storyLimits: getStoryLimits() }
  );
  return {
    collection: collection.asJson(),
    cacheKeys: collection.cacheKeys(config["publisher-id"])
  };
}
