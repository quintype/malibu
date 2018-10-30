import { Story } from '@quintype/framework/server/api-client'
import { storyToCacheKey } from '@quintype/framework/server/caching'

export function loadTagPageData (client, tagSlug, config) {
  return Story.getStories(client, 'top', { tag: tagSlug, limit: '20' }).then(
    stories => ({
      stories: stories.map(story => story.asJson()),
      cacheKeys: stories.map(story =>
        storyToCacheKey(config['publisher-id'], story)
      )
    })
  )
}
