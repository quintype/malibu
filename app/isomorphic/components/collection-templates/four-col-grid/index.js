// Implement more logic here

import React from "react";
import { array, object, number } from "prop-types";
import { StoryGrid } from "../../story-grid";
import "./four-col-grid.m.css";

export function FourColGrid({ collection, stories, index }) {
  const isInitRow = index === 0 || index === 1;
  return (
    <div>
      <h2 styleName="heading">{collection.name}</h2>
      <StoryGrid stories={stories} isInitRow={isInitRow} />
    </div>
  );
}

FourColGrid.propTypes = {
  collection: object,
  stories: array,
  index: number
};

FourColGrid.storyLimit = 8;
FourColGrid.nestedCollectionLimit = [1, 2, 3];
