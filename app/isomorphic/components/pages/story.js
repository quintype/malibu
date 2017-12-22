import React from "react";

import { BlankStory } from "../story-templates/blank.js";
import { InfiniteStoryBase } from "@quintype/components";

function StoryPageBase({index, story, otherProp}) {
  // Can switch to a different template based story-template, or only show a spoiler if index > 0
  return <BlankStory story={story} />
}

const FIELDS = "id,headline,slug,url,hero-image-s3-key,hero-image-metadata,first-published-at,last-published-at,alternative,published-at,author-name,author-id,sections,story-template,cards";
function storyPageLoadItems(pageNumber) {
  return global.superagent
           .get("/api/v1/stories", {fields: FIELDS, limit:5, offset:5*pageNumber})
           .then(response => response.body.stories.map(story => ({story: story, otherProp: "value"})));
}

function StoryPage(props) {
  return <InfiniteStoryBase {...props}
                            render={StoryPageBase}
                            loadItems={storyPageLoadItems}
                            onInitialItemFocus={(item) => app.registerPageView({pageType: "story-page", data: {story: item.story}}, `/${item.story.slug}`)}
                            onItemFocus={(item) => console.log(`Story In View: ${item.story.headline}`)}/>
}

export { StoryPage };
