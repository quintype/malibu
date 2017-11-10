const {Story} = require("quintype-toddy-libs/server/api-client");

exports.loadSearchPageData = function loadSearchPageData(client, query) {
  return Story.getSearch(client, {'q': query, 'limit': '20'})
    .then(result => ({
      stories: result.stories.map(story => story.asJson()),
      total: result.total,
      query: query
    }));
}
