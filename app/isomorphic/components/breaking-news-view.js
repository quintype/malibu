import React from "react";
import { bool, array, object } from "prop-types";
import { Link } from "@quintype/components";
import get from "lodash/get";
import "./breaking-news.m.css";

const OrangeBox = _ => <div styleName="orange-box">BREAKING NEWS</div>;
const renderBreakingNewsMarquee = (breakingNews, breakingNewsConfig) => {
  const items = breakingNews.map(story => {
    const linkedStorySlug = get(story, ["metadata", "linked-story-slug"], false) || false;
    if (linkedStorySlug) {
      return (
        <Link
          aria-label={`"Read full story: " ${story.headline}`}
          key={story.id}
          styleName="item"
          href={`/${linkedStorySlug}`}
          externalLink={breakingNewsConfig.open_in_new_tab ? `/${linkedStorySlug}` : false}
        >
          {story.headline}
        </Link>
      );
    }

    return (
      <div key={story.id} styleName="item">
        {story.headline}
      </div>
    );
  });

  return (
    <div styleName="marquee-wrapper" style={{ "--items": breakingNews.length }}>
      <div styleName="marquee-container">{items}</div>
    </div>
  );
};
export const BreakingNewsView = ({ breakingNews = [], breakingNewsConfig = {} }) => {
  if (!breakingNews.length || breakingNews.length === 0) {
    return <div className="empty-div-margin-bottom"></div>;
  }
  const breakingNewsItem = breakingNewsConfig.item_display
    ? breakingNews.slice(0, breakingNewsConfig.item_display)
    : breakingNews;

  return (
    <div styleName="base">
      <div styleName="container">
        <OrangeBox />
        {renderBreakingNewsMarquee(breakingNewsItem, breakingNewsConfig)}
      </div>
    </div>
  );
};

BreakingNewsView.propTypes = {
  breakingNewsLoaded: bool,
  breakingNews: array,
  breakingNewsConfig: object
};
