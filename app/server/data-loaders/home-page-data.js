/* eslint-disable no-unused-vars */
import { Story, Collection } from "@quintype/framework/server/api-client";
import { storyToCacheKey } from "@quintype/framework/server/caching";

export function loadHomePageData(client, config){
  return Story.getStories(client)
    .then(stories => ({
      stories: stories.map(story => story.asJson()),
      cacheKeys: [`q/${config['publisher-id']}/top/home`]
    }));
}
