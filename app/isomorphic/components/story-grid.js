import React from "react";
import { Link } from "@quintype/components";
import { shape, string, object, arrayOf, number, bool } from "prop-types";

import { CardImage } from "./atoms/card-image";

const StoryGridStoryItem = props => (
  <Link href={`/${props.story.slug}`} className="story-grid-item">
    <CardImage story={props.story} isInitRow={props.isInitRow} />
    <h3>{props.story.headline}</h3>
    <span className="story-grid-item-author">{props.story["author-name"]}</span>
  </Link>
);

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
  position: number,
  isInitRow: bool
};

export function StoryGrid({ stories = [], rowNumber }) {
  if (stories.length === 0) {
    return null;
  }

  const isInitRow = rowNumber === 0 || rowNumber === 1;

  return (
    <div className="story-grid">
      {stories.map((story, index) => (
        <StoryGridStoryItem story={story} key={`${index}-${story.id}`} position={index} isInitRow={isInitRow} />
      ))}
    </div>
  );
}

StoryGrid.propTypes = {
  stories: arrayOf(storyPropType),
  rowNumber: number
};
