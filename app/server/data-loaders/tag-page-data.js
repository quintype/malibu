import { get } from "lodash";
import { Story } from "@quintype/framework/server/api-client";
import { storyToCacheKey } from "@quintype/framework/server/caching";
import { TAG_PAGE_URL_PREFIX } from "../../isomorphic/constants";

export function loadTagPageData(client, tagSlug, config) {
  return Story.getStories(client, "top", { "tag-slugs": tagSlug, limit: "20" }).then(
    stories => {
      return client.getTags(tagSlug).then(({ tags }) => {
        const tagName = get(tags, [0, "name"], tagSlug);
        const tagDescription = get(tags, [0, "meta-description"], tagSlug);
        const tag = {
          slug: tagSlug,
          name: tagName,
          description: tagDescription,
          path: `${TAG_PAGE_URL_PREFIX}${tagSlug}`
        };
        return {
          stories: stories.map(story => story.asJson()),
          title: tagName,
          cacheKeys: stories.map(story =>
            storyToCacheKey(config["publisher-id"], story)
          ),
          tag
        };
      });
    }
  );
}
