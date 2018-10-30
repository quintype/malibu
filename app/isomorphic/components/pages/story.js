/* eslint-disable no-unused-vars, no-console, react/jsx-indent-props,react/jsx-wrap-multilines, no-undef, react/jsx-closing-bracket-location */

import React from 'react'
import { InfiniteStoryBase } from '@quintype/components'
import { BlankStory } from '../story-templates/blank'

function StoryPageBase ({ index, story, otherProp }) {
  // Can switch to a different template based story-template, or only show a spoiler if index > 0
  return <BlankStory story={story} />
}

const FIELDS =
  'id,headline,slug,url,hero-image-s3-key,hero-image-metadata,first-published-at,last-published-at,alternative,published-at,author-name,author-id,sections,story-template,cards'
function storyPageLoadItems (pageNumber) {
  return global
    .wretch('/api/v1/stories')
    .query({
      fields: FIELDS,
      limit: 5,
      offset: 5 * pageNumber
    })
    .get()
    .json(response =>
      response.stories.map(story => ({ story, otherProp: 'value' }))
    )
}

function StoryPage (props) {
  return (
    <InfiniteStoryBase
      {...props}
      render={StoryPageBase}
      loadItems={storyPageLoadItems}
      onInitialItemFocus={item =>
        app.registerPageView(
          { pageType: 'story-page', data: { story: item.story } },
          `/${item.story.slug}`
        )
      }
      onItemFocus={item => console.log(`Story In View: ${item.story.headline}`)}
    />
  )
}

export { StoryPage }
