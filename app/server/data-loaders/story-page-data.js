import { Story, Collection } from "@quintype/framework/server/api-client";
import get from "lodash/get";

export function loadStoryPageData(client, params, config, next) {
  async function returnStoryData(story) {
    const trendingCollection = await Collection.getCollectionBySlug(
      client,
      "trending",
      { "item-type": "story", limit: 16 },
      { depth: 0 }
    );
    const trendingStories = get(trendingCollection, ["collection", "items"], []);
    return {
      story: story.asJson(),
      trending: trendingStories.map(({ story }) => story),
      cacheKeys: story.cacheKeys(config["publisher-id"]),
      title: story.headline
    };
  }

  return Story.getStoryBySlug(client, decodeURIComponent(params.storySlug)).then(story =>
    story ? returnStoryData(story) : next()
  );
}

export function loadStoryPublicPreviewPageData(client, params) {
  return Story.getPublicPreviewStory(client, params.encryptedKey).then(story => ({ story: story.asJson() }));
}
