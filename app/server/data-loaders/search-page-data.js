const {Story, client} = require("quintype-toddy-libs/server/api-client");

exports.loadSearchPageData = function loadSearchPageData(){
  return Story.getStories(client, 'top', {'section-id': '81', 'limit': '10'})
    .then(stories => ({stories: stories.map(story => story.asJson())}));
}
