import React from "react";

import { StoryGrid } from "../story-grid";

const HomePage = props => (
  <div>
    <h1>Home</h1>
    <StoryGrid stories={props.data.stories} />
  </div>
);

export { HomePage };
