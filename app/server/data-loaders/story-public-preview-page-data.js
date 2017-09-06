const {Story, client} = require("quintype-toddy-libs/server/api-client");

exports.loadStoryPublicPreviewPageData = function loadStoryPublicPreviewPageData(params){
  return Story.getPublicPreviewStory(client, params.encryptedKey)
    .then(story => ({story: story.asJson()}));
}
