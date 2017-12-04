import {HomePage} from "./components/pages/home.js";
import {SectionPage} from "./components/pages/section.js";
import {TagPage} from "./components/pages/tag.js";
import {SearchPage} from "./components/pages/search.js";
import {StoryPage} from "./components/pages/story.js";
import {StoryPagePreview} from "./components/pages/story-preview.js";
import {StoryPublicPagePreview} from "./components/pages/story-public-preview.js";
import {HomePagePreview} from "./components/pages/home-preview.js";
import {NotFoundPage} from "./components/pages/not-found.js";

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

export { pickComponent };
