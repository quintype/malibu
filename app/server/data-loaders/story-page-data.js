const {Story, client} = require("quintype-toddy-libs/server/api-client");

exports.loadStoryPageData = function loadStoryPageData(params){
  return Story.getStoryBySlug(client, params.storySlug)
    .then(story => ({story: story.asJson()}));
}
