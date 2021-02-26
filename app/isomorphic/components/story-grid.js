import React from "react";
import { Link, ResponsiveImage } from "@quintype/components";
import { shape, string, object, integer, arrayOf } from "prop-types";
import "./story-grid.m.css";

function StoryGridStoryItem(props) {
  return (
    <Link href={`${props.story.slug}`} className="story-grid-item">
      <figure className="qt-image-16x9" styleName="story-grid-item-image">
        <ResponsiveImage
          slug={props.story["hero-image-s3-key"]}
          metadata={props.story["hero-image-metadata"]}
          aspectRatio={[16, 9]}
          defaultWidth={480}
          widths={[250, 480, 640]}
          sizes="( max-width: 500px ) 98vw, ( max-width: 768px ) 48vw, 23vw"
          imgParams={{ auto: ["format", "compress"] }}
          eager={props.position < 2 ? "above-fold" : "below-fold"}
          alt={props.story.headline || ""}
        />
      </figure>
      <h3>{props.story.headline}</h3>
      <span className="story-grid-item-author">{props.story["author-name"]}</span>
    </Link>
  );
}

const storyPropType = shape({
  id: string,
  slug: string,
  "hero-image-s3-key": string,
  "hero-image-metadata": object,
  headline: string,
  "author-name": string
});

StoryGridStoryItem.propTypes = {
  story: storyPropType,
  position: integer
};

export function StoryGrid({ stories = [] }) {
  if (stories.length === 0) {
    return null;
  }

  return (
    <div className="story-grid">
      {stories.map((story, index) => (
        <StoryGridStoryItem story={story} key={`${index}-${story.id}`} position={index} />
      ))}
    </div>
  );
}

StoryGrid.propTypes = {
  stories: arrayOf(storyPropType)
};
