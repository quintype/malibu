import { Story } from "@quintype/framework/server/api-client";

export function loadStoryPageData(client, params, config) {
  return Story.getStoryBySlug(client, params.storySlug).then(story => ({
    story: story.asJson(),
    cacheKeys: story.cacheKeys(config["publisher-id"]),
    title: story.headline
  }));
}

export function loadStoryPublicPreviewPageData(client, params) {
  return Story.getPublicPreviewStory(client, params.encryptedKey).then(
    story => ({ story: story.asJson() })
  );
}
