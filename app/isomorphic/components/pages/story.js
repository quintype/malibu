import React from "react";
import { InfiniteStoryBase, WithPreview } from "@quintype/components";
// import { BlankStory } from "../story-templates/blank";
import { number, object, shape, any, array } from "prop-types";
import {
  LiveBlogStoryTemplate,
  ListicleStoryTemplate,
  VideoStoryTemplate,
  TextStoryTemplate,
  PhotoStoryTemplates
} from "@quintype/arrow";
function StoryPageBase({ index, story, otherProp, trending }) {
  const templateConfigcommon = {
    theme: "#ffffff",
    sort: "image-first",
    noOfVisibleCards: -1,
    publishedDetails: {
      enablePublishedTime: true,
      enableUpdatedTime: true,
      enableReadTime: true
    },
    asideCollection: {
      data: trending,
      config: {
        collectionNameBorderColor: "#3a9fdd",
        title: "Trending",
        theme: "#ffffff"
      }
    },
    authorDetails: {
      template: "default",
      opts: {
        showBio: true,
        showImage: true
      }
    }
  };
  const storyElementsConfig = {
    summary: {},
    blurb: {},
    blockquote: {},
    quote: {},
    "also-read": {},
    "q-and-a": {},
    question: {},
    answer: {},
    references: {}
  };
  const templateConfigLiveBlog = {
    theme: "#ffffff",
    templateType: "default",
    noOfVisibleCards: -1,
    showSectionTag: true,
    buttonText: "Load More",
    publishedDetails: {
      enablePublishedTime: true,
      enableUpdatedTime: true
    },
    asideCollection: {
      data: trending,
      config: {
        title: "Trending Stories",
        theme: "#ffffff",
        showAuthor: true,
        showTime: true
      }
    },
    authorDetails: {
      template: "default",
      opts: {
        hideBio: false,
        hideImage: false
      }
    }
  };
  switch (story["story-template"]) {
    case "live-blog":
      return (
        <LiveBlogStoryTemplate
          story={story}
          config={templateConfigLiveBlog}
          storyElementsConfig={storyElementsConfig}
        />
      );
    case "listicle":
      return (
        <ListicleStoryTemplate story={story} config={templateConfigcommon} storyElementsConfig={storyElementsConfig} />
      );
    case "video":
      return (
        <VideoStoryTemplate story={story} config={templateConfigcommon} storyElementsConfig={storyElementsConfig} />
      );
    case "photo":
      return (
        <PhotoStoryTemplates story={story} config={templateConfigcommon} storyElementsConfig={storyElementsConfig} />
      );
    default:
      return (
        <TextStoryTemplate story={story} config={templateConfigcommon} storyElementsConfig={storyElementsConfig} />
      );
  }
}

StoryPageBase.propTypes = {
  index: number,
  story: object,
  otherProp: any,
  trending: array
};

const FIELDS =
  "id,headline,slug,url,hero-image-s3-key,hero-image-metadata,first-published-at,last-published-at,alternative,published-at,author-name,author-id,sections,story-template,cards,read-time,updated-at";
function storyPageLoadItems(pageNumber) {
  return global
    .wretch("/api/v1/stories")
    .query({
      fields: FIELDS,
      limit: 5,
      offset: 5 * pageNumber
    })
    .get()
    .json(response => response.stories.map(story => ({ story, otherProp: "value" })));
}

export function StoryPage(props) {
  return (
    <InfiniteStoryBase
      {...props}
      render={StoryPageBase}
      loadItems={storyPageLoadItems}
      onInitialItemFocus={item =>
        window.app.registerPageView({ pageType: "story-page", data: { story: item.story } }, `/${item.story.slug}`)
      }
      onItemFocus={item => console.log(`Story In View: ${item.story.headline}`)}
    />
  );
}

StoryPage.propTypes = {
  data: shape({
    story: object
  })
};

export const StoryPagePreview = WithPreview(StoryPage, (data, story) =>
  Object.assign({}, data, {
    story,
    relatedStories: Array(5).fill(story)
  })
);
