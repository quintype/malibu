import React from "react";
import PT from "prop-types";
import { StoryGrid } from "../story-grid";
import { replaceAllCollectionToStories } from "../helper/utils";

const SectionPage = props => {
  const stories = replaceAllCollectionToStories(props.data.collection) || [];

  return (
    <div>
      <h1>{`Section - ${props.data.section["display-name"] || props.data.section.name}`}</h1>
      <StoryGrid stories={stories} />
    </div>
  );
};

SectionPage.propTypes = {
  data: PT.shape({
    collection: PT.object,
    section: PT.string
  })
};

export { SectionPage };
