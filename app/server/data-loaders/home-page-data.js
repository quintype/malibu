const {Story, client} = require("quintype-toddy-libs/server/api-client");

exports.loadHomePageData = function loadHomePageData(){
  return Story.getStories(client, 'top', {})
    .then(stories => ({stories: stories.map(story => story.asJson())}));
}
