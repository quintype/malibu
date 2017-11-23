const React = require("react");

const { BlankStory } = require("../story-templates/blank.jsx");
const { StoryPageWithInfiniteScroll } = require("./story-page-with-infinite-scroll.jsx");

function StoryPageBase(props) {
  return <BlankStory story={props.story} />
}

const FILEDS = "id,headline,slug,url,hero-image-s3-key,hero-image-metadata,first-published-at,last-published-at,alternative,published-at,author-name,author-id,sections,story-template,cards";
function storyPageLoadStories(pageNumber) {
  return global.superagent
           .get("/api/v1/stories", {fields: FILEDS, limit:5, offset:5*pageNumber})
           .then(response => response.body.stories);
}

function StoryPage(props) {
  return React.createElement(StoryPageWithInfiniteScroll, Object.assign({}, props, {
    render: StoryPageBase,
    loadStories: storyPageLoadStories
  }));
}

exports.StoryPage = StoryPage;
