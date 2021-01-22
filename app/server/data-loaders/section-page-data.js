import { Story } from "@quintype/framework/server/api-client";
import { sorterToCacheKey, storyToCacheKey } from "@quintype/framework/server/caching";

import { storyFields } from "../../isomorphic/constants";
import { loadCommonCollectionData } from "./load-common-collection-data";

export async function loadSectionPageData(client, sectionId, config, publisherAttributes) {
  const section = config.sections.find(section => section.id === sectionId) || {};
  const sectionSlug = section.collection === null ? null : section.collection.slug;
  const shouldUseCollection = sectionSlug && publisherAttributes.should_use_collection;

  if (shouldUseCollection) {
    const params = {
      client,
      config,
      slug: sectionSlug,
      collectionParams: { limit: 20 },
      depthParams: { depth: 2 }
    };
    const collection = await loadCommonCollectionData(params);
    const newObj = Object.assign({}, collection);
    newObj.section = section;
    return newObj;
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
