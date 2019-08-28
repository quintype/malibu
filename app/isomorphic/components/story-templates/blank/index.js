import React from "react";
import { object } from "prop-types";

import { ResponsiveImage, StoryElement } from "@quintype/components";

import MetypeCommentWrapper from "../../metype-widget";

import "./blank.m.css";

function StoryCard({ card, story }) {
  return (
    <div>
      {card["story-elements"].map(element => (
        <StoryElement element={element} key={element.id} story={story} />
      ))}
    </div>
  );
}

export class BlankStoryTemplate extends React.Component {
  state = {
    renderMetype: false
  };

  componentDidMount() {
    this.setState({
      renderMetype: true
    });
  }

  render() {
    return (
      <div className="blank-story">
        <figure className="blank-story-image qt-image-16x9">
          <ResponsiveImage
            slug={this.props.story["hero-image-s3-key"]}
            metadata={this.props.story["hero-image-metadata"]}
            aspectRatio={[16, 9]}
            defaultWidth={480}
            widths={[250, 480, 640]}
            imgParams={{ auto: ["format", "compress"] }}
          />
        </figure>
        <h1>{this.props.story.headline}</h1>
        <span className="blank-story-author">{this.props.story["author-name"]}</span>
        {this.props.story.cards.map(card => (
          <StoryCard key={card.id} card={card} story={this.props.story} />
        ))}
        <div className="space-before-next-story" style={{ minHeight: 100 }} />
        <div styleName="metype-widget" className="container">
          {this.state.renderMetype ? (
            <MetypeCommentWrapper metypeConfig={this.props.metypeConfig} story={this.props.story} />
          ) : null}
        </div>
      </div>
    );
  }
}

function BlankStory(props) {
  return (
    <div className="story-grid">
      <BlankStoryTemplate story={props.story} metypeConfig={props.metypeConfig} />
    </div>
  );
}

StoryCard.propTypes = {
  card: object,
  story: object
};

BlankStoryTemplate.propTypes = {
  story: object,
  metypeConfig: object,
  collections: object
};

BlankStory.propTypes = {
  story: object,
  collections: object,
  metypeConfig: object
};

export default BlankStory;
