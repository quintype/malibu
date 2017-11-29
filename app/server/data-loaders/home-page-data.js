const {Story, Collection} = require("@quintype/framework/server/api-client");
const {storyToCacheKey} = require("@quintype/framework/server/caching");

exports.loadHomePageData = function loadHomePageData(client, config){
  return Collection.getCollectionBySlug(client, 'home', {'item-type': 'story', 'limit': 20})
    .then(collection => ({
      stories: collection.items.map(story => story.story),
      cacheKeys: collection.cacheKeys(config['publisher-id'])
    }));
}
