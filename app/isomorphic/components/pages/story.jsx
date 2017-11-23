const React = require("react");

const { BlankStory } = require("../story-templates/blank.jsx");
const { InfiniteStoryBase } = require("quintype-toddy-libs/components/infinite-story-base");

function StoryPageBase({index, story}) {
  return <BlankStory story={story} index={index} />
}

const FIELDS = "id,headline,slug,url,hero-image-s3-key,hero-image-metadata,first-published-at,last-published-at,alternative,published-at,author-name,author-id,sections,story-template,cards";
function storyPageLoadStories(pageNumber) {
  return global.superagent
           .get("/api/v1/stories", {fields: FIELDS, limit:5, offset:5*pageNumber})
           .then(response => response.body.stories);
}

function StoryPage(props) {
  return <InfiniteStoryBase {...props}
                            render={StoryPageBase}
                            loadStories={storyPageLoadStories}
                            onStoryFocus={(story) => console.log(`Story In View: ${story.headline}`)}
                            onInitialStoryFocus={(story) => console.log(`Do Analytics ${story.headline}`)} />
}

exports.StoryPage = StoryPage;
