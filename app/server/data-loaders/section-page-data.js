import { Story, Collection } from "@quintype/framework/server/api-client";
import { sorterToCacheKey, storyToCacheKey } from "@quintype/framework/server/caching";

export function loadSectionPageData(client, sectionId, config) {
  const section = config.sections.find(section => section.id === sectionId);
  const sectionSlug = section.collection === null ? null : section.collection.slug;
  if (sectionSlug) {
    return Collection.getCollectionBySlug(client, sectionSlug, { limit: 50 }, { depth: 3 }).then(collection => {
      return {
        section: section,
        collection: collection.asJson(),
        cacheKeys: collection.cacheKeys(config["publisher-id"])
      };
    });
  } else {
    const storyFields =
      "headline,subheadline,summary,sections,tags,author-name,author-id,authors,updated-at,last-published-at,published-at,updated-at,first-published-at,hero-image-metadata,hero-image-s3-key,story-content-id,slug,id,seo,story-template,metadata,url";
    return Story.getStories(client, "top", { "section-id": section.id, fields: storyFields }).then(stories => {
      const allStories = stories.map(story => story.asJson());

      const collection = {
        items: [],
        name: section["display-name"] || section.name,
        slug: section.slug
      };

      collection.items = allStories.map(story => story);
      return {
        section: section,
        collection: collection,
        cacheKeys: [sorterToCacheKey(config["publisher-id"], "top", sectionId)].concat(
          stories.map(story => storyToCacheKey(config["publisher-id"], story))
        )
      };
    });
  }
}
