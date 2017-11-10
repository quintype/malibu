const {Story} = require("quintype-toddy-libs/server/api-client");

exports.loadStoryPageData = function loadStoryPageData(client,  params){
  return Story.getStoryBySlug(client, params.storySlug)
    .then(story => ({story: story.asJson()}));
}
