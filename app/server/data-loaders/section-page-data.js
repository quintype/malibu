import { Story } from "@quintype/framework/server/api-client";
import { sorterToCacheKey, storyToCacheKey } from "@quintype/framework/server/caching";

export function loadSectionPageData(client, sectionId, config) {
  return Story.getStories(client, "top", {
    "section-id": sectionId,
    limit: "20"
  }).then(stories => ({
    section: config.sections.find(section => section.id === sectionId),
    stories: stories.map(story => story.asJson()),
    cacheKeys: [sorterToCacheKey(config["publisher-id"], "top", sectionId)].concat(
      stories.map(story => storyToCacheKey(config["publisher-id"], story))
    )
  }));
}
