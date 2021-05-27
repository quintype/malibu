import React from "react";
import PT from "prop-types";

import { StoryElement } from "@quintype/components";
import { CardImage } from "../atoms/card-image";

function StoryCard(props) {
  return (
    <div>
      {props.card["story-elements"].map(element => (
        <StoryElement element={element} key={element.id} story={props.story} loadIframeOnClick />
      ))}
    </div>
  );
}

StoryCard.propTypes = {
  card: PT.object,
  story: PT.object
};

function BlankStoryTemplate(props) {
  return (
    <div className="blank-story container">
      {/* The pagetype can be fetched from redux as well */}
      <CardImage pageType="story-page" story={props.story} isInitRow />
      <h1>{props.story.headline}</h1>
      <span className="blank-story-author">{props.story["author-name"]}</span>
      {props.story.cards.map(card => (
        <StoryCard key={card.id} card={card} story={props.story} />
      ))}
      <div className="space-before-next-story" style={{ minHeight: 100 }} />
    </div>
  );
}

BlankStoryTemplate.propTypes = {
  card: PT.object,
  story: PT.object
};

function BlankStory(props) {
  return (
    <div className="story-grid">
      <BlankStoryTemplate story={props.story} />
    </div>
  );
}

BlankStory.propTypes = {
  story: PT.object
};

export { BlankStory };
