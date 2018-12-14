import React from "react";

import { ResponsiveImage, StoryElement } from "@quintype/components";

function StoryCard(props) {
  return (
    <div>
      {props.card["story-elements"].map(element => (
        <StoryElement element={element} key={element.id} story={props.story} />
      ))}
    </div>
  );
}

function BlankStoryTemplate(props) {
  return (
    <div className="blank-story">
      <figure className="blank-story-image qt-image-16x9">
        <ResponsiveImage
          slug={props.story["hero-image-s3-key"]}
          metadata={props.story["hero-image-metadata"]}
          aspectRatio={[16, 9]}
          defaultWidth={480}
          widths={[250, 480, 640]}
          imgParams={{ auto: ["format", "compress"] }}
        />
      </figure>
      <h1>{props.story.headline}</h1>
      <span className="blank-story-author">{props.story["author-name"]}</span>
      {props.story.cards.map(card => (
        <StoryCard key={card.id} card={card} story={props.story} />
      ))}
      <div className="space-before-next-story" style={{ minHeight: 100 }} />
    </div>
  );
}

function BlankStory(props) {
  return (
    <div className="story-grid">
      <BlankStoryTemplate story={props.story} />
    </div>
  );
}

export { BlankStory };
