const {Story, client} = require("quintype-toddy-libs/server/api-client");

exports.loadHomePageData = function loadHomePageData(){
  return client.getCollectionBySlug('home', {'item-type': 'story', 'limit': 20})
    .then(collection => ({
      stories: collection.items.map(story => story.story)
    }));
}
