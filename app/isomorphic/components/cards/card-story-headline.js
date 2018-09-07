import React from "react";
import "./card-story-headline.m.css";
function CardStoryHeadline ({story}) {
  return (
    <h3 styleName="CardStoryHeadline"><a styleName="CardStoryHeadlineLink" href={story.slug}>{story.headline}</a></h3>
  );
}

export {CardStoryHeadline}
