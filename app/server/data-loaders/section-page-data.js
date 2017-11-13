const {Story} = require("quintype-toddy-libs/server/api-client");
const {sorterToCacheKey, storyToCacheKey} = require("quintype-toddy-libs/server/caching");

exports.loadSectionPageData = function loadSectionPageData(client, sectionId, config) {
  return Story.getStories(client, 'top', {'section-id': sectionId, 'limit': '20'})
    .then(stories => ({
      section: config["sections"].find(section => section.id == sectionId),
      stories: stories.map(story => story.asJson()),
      cacheKeys: [sorterToCacheKey(config["publisher-id"], "top", sectionId)].concat(stories.map(story => storyToCacheKey(config["publisher-id"], story)))
    }));
}
