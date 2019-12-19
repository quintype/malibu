// Implement more logic here

import React from "react";
import { array, object } from "prop-types";
import { StoryGrid } from "../../story-grid";
import "./four-col-grid.m.css";

export function FourColGrid({ collection, stories }) {
  return (
    <div>
      <h3 styleName="heading">{collection.name}</h3>
      <StoryGrid stories={stories} />
    </div>
  );
}

FourColGrid.propTypes = {
  collection: object,
  stories: array
};

FourColGrid.storyLimit = 8;
