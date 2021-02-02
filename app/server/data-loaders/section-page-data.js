import { Story, Collection } from "@quintype/framework/server/api-client";
import { sorterToCacheKey, storyToCacheKey } from "@quintype/framework/server/caching";

import { storyFields } from "../../isomorphic/constants";

export function loadSectionPageData(client, sectionId, config, publisherAttributes) {
  const section = config.sections.find(section => section.id === sectionId) || {};
  const collectionSlug = section.collection === null ? null : section.collection.slug;
  const shouldUseCollection = collectionSlug && publisherAttributes.should_use_collection;
  if (shouldUseCollection) {
    return Collection.getCollectionBySlug(client, collectionSlug, { limit: 20 }, { depth: 2 }).then(collection => {
      return {
        section: section,
        collection: collection.asJson(),
        cacheKeys: collection.cacheKeys(config["publisher-id"])
      };
    });
  } else {
    return Story.getStories(client, "top", { "section-id": section.id, fields: storyFields, limit: 20 }).then(
      stories => {
        const allStories = stories.map(story => {
          return { story: story.asJson(), type: "story" };
        });

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
      }
    );
  }
}
