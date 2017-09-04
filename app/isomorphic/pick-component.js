const {HomePage} = require("./components/pages/home.jsx");
const {SectionPage} = require("./components/pages/section.jsx");
const {TagPage} = require("./components/pages/tag.jsx");
const {SearchPage} = require("./components/pages/search.jsx");
const {StoryPage} = require("./components/pages/story.jsx");
const {StoryPagePreview} = require("./components/pages/story-preview.jsx");
const {NotFoundPage} = require("./components/pages/not-found.jsx");

function pickComponent(pageType) {
  switch (pageType) {
    case 'home-page': return HomePage;
    case 'section-page': return SectionPage;
    case 'tag-page': return TagPage;
    case 'search-page': return SearchPage;
    case 'story-page': return StoryPage;
    case 'story-preview-page': return StoryPagePreview ;
    default: return NotFoundPage;
  }
}

exports.pickComponent = pickComponent;
