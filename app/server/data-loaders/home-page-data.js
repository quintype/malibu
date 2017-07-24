const {Story, client} = require("../client");

exports.loadHomePageData = function loadHomePageData(params){
  return Story.getStories(client, 'top', {})
    .then(stories => ({stories: stories.map(story => story.asJson())}));
}
