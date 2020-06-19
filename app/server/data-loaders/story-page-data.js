import { Story } from "@quintype/framework/server/api-client";

export function loadStoryPageData(client, params, config, next) {
  function returnStoryData(story) {
    return {
      story: story.asJson(),
      cacheKeys: story.cacheKeys(config["publisher-id"]),
      title: story.headline
    };
  }

  return Story.getStoryBySlug(client, decodeURIComponent(params.storySlug)).then(
    story => (story ? returnStoryData(story) : next())
  );
}

export function loadStoryPublicPreviewPageData(client, params) {
  return Story.getPublicPreviewStory(client, params.encryptedKey).then(
    story => ({ story: story.asJson() })
  );
}
