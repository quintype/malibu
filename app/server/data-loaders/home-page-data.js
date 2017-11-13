const {Story, Collection} = require("quintype-toddy-libs/server/api-client");
const {storyToCacheKey} = require("quintype-toddy-libs/server/caching");

exports.loadHomePageData = function loadHomePageData(client, config){
  return Collection.getCollectionBySlug(client, 'home', {'item-type': 'story', 'limit': 20})
    .then(collection => ({
      stories: collection.items.map(story => story.story),
      cacheKeys: collection.cacheKeys(config['publisher-id'])
    }));
}
