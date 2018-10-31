import { Story } from "@quintype/framework/server/api-client";

export function loadSearchPageData(client, query) {
  return Story.getSearch(client, { q: query, limit: "20" }).then(result => ({
    stories: result.stories.map(story => story.asJson()),
    total: result.total,
    query
  }));
}
