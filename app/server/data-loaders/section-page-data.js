const {Story} = require("quintype-toddy-libs/server/api-client");

exports.loadSectionPageData = function loadSectionPageData(client, sectionId, config) {
  return Story.getStories(client, 'top', {'section-id': sectionId, 'limit': '20'})
    .then(stories => ({
      section: config["sections"].find(section => section.id == sectionId),
      stories: stories.map(story => story.asJson())
    }));
}
