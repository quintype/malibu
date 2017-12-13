import { Story, Collection } from "@quintype/framework/server/api-client";
import { storyToCacheKey } from "@quintype/framework/server/caching";

export function loadHomePageData(client, config) {
  return Collection.getCollectionBySlug(client, "home", {
    "item-type": "story",
    limit: 20
  }).then(collection => ({
    stories: collection.items.map(story => story.story),
    cacheKeys: collection.cacheKeys(config["publisher-id"])
  }));
}
