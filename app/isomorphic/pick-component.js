const {HomePage} = require("./components/pages/home.js");
const {SectionPage} = require("./components/pages/section.js");
const {TagPage} = require("./components/pages/tag.js");
const {SearchPage} = require("./components/pages/search.js");
const {StoryPage} = require("./components/pages/story.js");
const {StoryPagePreview} = require("./components/pages/story-preview.js");
const {StoryPublicPagePreview} = require("./components/pages/story-public-preview.js");
const {HomePagePreview} = require("./components/pages/home-preview.js");
const {NotFoundPage} = require("./components/pages/not-found.js");

function pickComponent(pageType) {
  switch (pageType) {
    case 'home-page': return HomePage;
    case 'section-page': return SectionPage;
    case 'tag-page': return TagPage;
    case 'search-page': return SearchPage;
    case 'story-page': return StoryPage;
    case 'story-preview-page': return StoryPagePreview ;
    case 'story-public-preview-page': return StoryPublicPagePreview ;
    case 'home-preview-page': return HomePagePreview ;
    default: return NotFoundPage;
  }
}

exports.pickComponent = pickComponent;
