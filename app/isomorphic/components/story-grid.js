import React, { useEffect, useState } from "react";
import { Link, ResponsiveImage } from "@quintype/components";
import { shape, string, object, arrayOf, number, bool } from "prop-types";
import "./story-grid.m.css";

function StoryGridStoryItem(props) {
  const imagePerfObj = props.isInitRow ? { size: "3vw", blur: 0 } : { size: "25vw", blur: 0 };
  const [perfObj, setPerfObj] = useState(imagePerfObj);

  useEffect(() => {
    if (props.isInitRow) {
      setTimeout(() => {
        setPerfObj({ size: "30vw", blur: 0 });
      }, 2500);
    }
  }, []);

  return (
    <Link href={`/${props.story.slug}`} className="story-grid-item">
      <figure
        className="qt-image-16x9"
        styleName={`story-grid-item-image ${!props.story["hero-image-s3-key"] ? "placeholder" : ""}`}
      >
        {props.story["hero-image-s3-key"] && (
          <ResponsiveImage
            slug={props.story["hero-image-s3-key"]}
            metadata={props.story["hero-image-metadata"]}
            aspectRatio={[16, 9]}
            defaultWidth={480}
            widths={[250, 480, 640]}
            sizes={perfObj.size}
            imgParams={{ auto: ["format", "compress"], blur: perfObj.blur }}
            alt={props.story.headline || ""}
          />
        )}
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
