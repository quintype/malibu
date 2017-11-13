const {Story} = require("quintype-toddy-libs/server/api-client");
const {storyToCacheKey} = require("quintype-toddy-libs/server/caching");

exports.loadTagPageData = function loadTagPageData(client, tagSlug, config) {
  return Story.getStories(client, 'top', {'tag': tagSlug, 'limit': '20'})
    .then(stories => ({
      stories: stories.map(story => story.asJson()),
      cacheKeys: stories.map(story => storyToCacheKey(config["publisher-id"], story))
    }));
}
