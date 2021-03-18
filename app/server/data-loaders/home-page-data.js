/* eslint-disable no-unused-vars */
import { Collection } from "@quintype/framework/server/api-client";
import { getStoryLimits } from "../../isomorphic/components/get-collection-template";

export async function loadHomePageData(client, config, slug) {
  const storyFields =
    "updated-at, author-name, headline, slug, last-published-at, sections, hero-image-metadata, hero-image-s3-key, url, authors";
  const collection = await Collection.getCollectionBySlug(
    client,
    slug,
    { "item-type": "collection", "story-fields": storyFields },
    { depth: 1, storyLimits: getStoryLimits() }
  );
  return {
    collection: collection.asJson(),
    cacheKeys: collection.cacheKeys(config["publisher-id"])
  };
}
