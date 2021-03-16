import React from "react";
import { bool, array, object, string } from "prop-types";
import { Link } from "@quintype/components";
import get from "lodash/get";
import { connect } from "react-redux";

import "./breaking-news.m.css";

const renderBreakingNewsMarquee = (breakingNews, breakingNewsConfig) => {
  const items = breakingNews.map(story => {
    const linkedStorySlug = get(story, ["metadata", "linked-story-slug"], null);
    const externalLink = breakingNewsConfig.open_in_new_tab ? `/${linkedStorySlug}` : false;
    const linkLabel = `Read full story: ${story.headline}`;

    if (linkedStorySlug) {
      return (
        <Link
          aria-label={linkLabel}
          key={story.id}
          styleName="item"
          href={`/${linkedStorySlug}`}
          externalLink={externalLink}
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
export const BreakingNewsViewBase = ({ breakingNews = [], breakingNewsConfig = {}, pageType }) => {
  const shouldBreakingNewsShow = breakingNews.length === 0 || !breakingNewsConfig.pages.includes(pageType);
  const breakingNewsCount = breakingNewsConfig.item_display;
  const breakingNewsItem = breakingNewsCount ? breakingNews.slice(0, breakingNewsCount) : breakingNews;

  if (shouldBreakingNewsShow) {
    return <div className="empty-div-margin-bottom"></div>;
  }

  return (
    <div styleName="base" className="container">
      <div styleName="container">
        <div styleName="breaking-news-label">BREAKING NEWS</div>
        {renderBreakingNewsMarquee(breakingNewsItem, breakingNewsConfig)}
      </div>
    </div>
  );
};

BreakingNewsViewBase.propTypes = {
  breakingNewsLoaded: bool,
  breakingNews: array,
  breakingNewsConfig: object,
  pageType: string
};

const mapStateToProps = state => ({
  pageType: get(state, ["qt", "pageType"], null),
  breakingNewsConfig: get(state, ["qt", "config", "publisher-attributes", "breaking_news"], {})
});

export const BreakingNewsView = connect(mapStateToProps, () => ({}))(BreakingNewsViewBase);
