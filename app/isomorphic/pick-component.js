import { PAGE_TYPE } from "./constants";

import { HomePage } from "./components/pages/home";
import { SectionPage } from "./components/pages/section";
import { TagPage } from "./components/pages/tag";
import { SearchPage } from "./components/pages/search";
import { StoryPage } from "./components/pages/story";
import { StoryPagePreview } from "./components/pages/story-preview";
import { HomePagePreview } from "./components/pages/home-preview";
import { NotFoundPage } from "./components/pages/not-found";

function pickComponent(pageType) {
  switch (pageType) {
    case PAGE_TYPE.HOME_PAGE:
      return HomePage;
    case PAGE_TYPE.SECTION_PAGE:
      return SectionPage;
    case PAGE_TYPE.TAG_PAGE:
      return TagPage;
    case PAGE_TYPE.SEARCH_PAGE:
      return SearchPage;
    case PAGE_TYPE.STORY_PAGE:
      return StoryPage;
    case PAGE_TYPE.STORY_PREVIEW:
      return StoryPagePreview;
    case PAGE_TYPE.STORY_PUBLIC_PREVIEW_PAGE:
      return StoryPage;
    case PAGE_TYPE.HOME_PREVIEW:
      return HomePagePreview;
    default:
      return NotFoundPage;
  }
}

export { pickComponent };
