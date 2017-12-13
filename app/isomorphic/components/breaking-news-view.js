import React from "react";

function BreakingNewsView(props) {
  if (props.breakingNews.length == 0) {
    return <span />;
  }
  return (
    <ul className="breaking-news">
      {props.breakingNews.map(story => breakingNewsItem(story))}
    </ul>
  );

  function breakingNewsItem(story) {
    return <li key={story.id}>{story.headline}</li>;
  }
}

export { BreakingNewsView };
