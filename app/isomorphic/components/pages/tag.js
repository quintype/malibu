import React from "react";

import { StoryGrid } from "../story-grid";

const TagPage = props => (
  <div>
    <h1>Tag Page</h1>
    <StoryGrid stories={props.data.stories} />
  </div>
);

export { TagPage };
