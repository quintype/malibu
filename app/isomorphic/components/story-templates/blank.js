import React from "react";
import PT from "prop-types";
import { WithLazy, ResponsiveImage, StoryElement } from "@quintype/components";

import "./blank.m.css";

function StoryCard(props) {
  return (
    <div styleName="story-card">
      {props.card["story-elements"].map(element => {
        if (element.type === "image" || element.type === "jsembed" || element.type === "youtube-video") {
          return (
            <WithLazy margin="50px">
              {() => <StoryElement element={element} key={element.id} story={props.story} loadIframeOnClick />}
            </WithLazy>
          );
        }
        return <StoryElement element={element} key={element.id} story={props.story} loadIframeOnClick />;
      })}
    </div>
  );
}

StoryCard.propTypes = {
  card: PT.object,
  story: PT.object
};

function BlankStoryTemplate(props) {
  return (
    <div className="container">
      <div styleName="wrapper">
        <WithLazy margin="20px">
          {() => (
            <figure className="blank-story-image" styleName="qt-image-16x9">
              <ResponsiveImage
                slug={props.story["hero-image-s3-key"]}
                metadata={props.story["hero-image-metadata"]}
                aspectRatio={[16, 9]}
                defaultWidth={480}
                widths={[250, 480, 640]}
                sizes="( max-width: 120px ) 98%, ( max-width: 768px ) 48%, 23%"
                imgParams={{ auto: ["format", "compress"], fmt: "webp" }}
              />
            </figure>
          )}
        </WithLazy>
        <h1 styleName="headline">{props.story.headline}</h1>
        <div styleName="author"> By {props.story["author-name"]}</div>
        {props.story.cards &&
          props.story.cards.map(card => <StoryCard key={card.id} card={card} story={props.story} />)}
      </div>
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
