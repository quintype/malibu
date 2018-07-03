import React from "react";
import { Link, ResponsiveImage, ClientSideOnly } from "@quintype/components";
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

function StoryGrid(props) {
  return (
    <div className="story-grid">
      {props.stories.map(story => (
        <StoryGridStoryItem story={story} key={story.id} />
      ))}
      <ClientSideOnly />
    </div>
  );
}

export { StoryGrid };
