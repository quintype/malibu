const {Story, client} = require("quintype-toddy-libs/server/api-client");

exports.loadTagPageData = function loadTagPageData(tagSlug) {
  return Story.getStories(client, 'top', {'tag': tagSlug, 'limit': '20'})
    .then(stories => ({
      stories: stories.map(story => story.asJson())
    }));
}
