import React from "react";
import { bool, array, object, string } from "prop-types";
import { Link } from "@quintype/components";
import get from "lodash/get";
import { connect } from "react-redux";
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
export const BreakingNewsViewBase = ({ breakingNews = [], breakingNewsConfig = {}, pageType }) => {
  if (!breakingNews.length || breakingNews.length === 0 || !breakingNewsConfig.pages.includes(pageType)) {
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

BreakingNewsViewBase.propTypes = {
  breakingNewsLoaded: bool,
  breakingNews: array,
  breakingNewsConfig: object,
  pageType: string
};

function mapStateToProps(state) {
  return {
    pageType: get(state, ["qt", "pageType"], null),
    breakingNewsConfig: get(state, ["qt", "config", "publisher-attributes", "breaking_news"], {})
  };
}

export const BreakingNewsView = connect(mapStateToProps, () => ({}))(BreakingNewsViewBase);
