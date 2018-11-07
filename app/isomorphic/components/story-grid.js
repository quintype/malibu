import React from "react";
import { Link, ResponsiveImage } from "@quintype/components";
import PT from "prop-types";
import "./story-grid.m.css";

function StoryGridStoryItem(props) {
  return (
    <Link href={`/${props.story.slug}`} className="story-grid-item">
      <figure className="qt-image-16x9" styleName="story-grid-item-image">
        <ResponsiveImage
          slug={props.story["hero-image-s3-key"]}
          metadata={props.story["hero-image-metadata"]}
          aspectRatio={[16, 9]}
          defaultWidth={480}
          widths={[250, 480, 640]}
          sizes="( max-width: 500px ) 98%, ( max-width: 768px ) 48%, 23%"
          imgParams={{ auto: ["format", "compress"] }}
        />
      </figure>
      <h2>{props.story.headline}</h2>
      <span className="story-grid-item-author">
        {props.story["author-name"]}
      </span>
    </Link>
  );
}

const storyPropType = PT.shape({
  id: PT.string,
  slug: PT.string,
  "hero-image-s3-key": PT.string,
  "hero-image-metadata": PT.object,
  headline: PT.string,
  "author-name": PT.string
});

StoryGridStoryItem.propTypes = {
  story: storyPropType
};

function StoryGrid(props) {
  return (
    <div className="story-grid">
      {props.stories.map(story => (
        <StoryGridStoryItem story={story} key={story.id} />
      ))}
    </div>
  );
}

StoryGrid.propTypes = {
  stories: PT.arrayOf(storyPropType)
};

export { StoryGrid };
