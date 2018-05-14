import { Story } from "@quintype/framework/server/api-client";

export function loadStoryPageData(client, params, config) {
  function returnStoryData(story) {
    return {
      story: story.asJson(),
      cacheKeys: story.cacheKeys(config["publisher-id"]),
      title: story.headline
    };
  }

  return Story.getStoryBySlug(client, params.storySlug)
              .then(story => story ? returnStoryData(story) : {pageType: 'not-found', httpStatusCode: 404});
}

export function loadStoryPublicPreviewPageData(client, params) {
  return Story.getPublicPreviewStory(client, params.encryptedKey).then(
    story => ({ story: story.asJson() })
  );
}
