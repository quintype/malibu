import {Story} from "@quintype/framework/server/api-client";

export function loadStoryPublicPreviewPageData(client, params){
  return Story.getPublicPreviewStory(client, params.encryptedKey)
    .then(story => ({story: story.asJson()}));
}
