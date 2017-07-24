const {Story, client} = require("../client");

exports.loadStoryPageData = function loadStoryPageData(params){
  return Story.getStoryBySlug(client, params.storySlug)
    .then(story => ({story: story.asJson()}));
}
