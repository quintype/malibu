import React from "react";

import { StoryGrid } from "../story-grid";

const SearchPage = props => (
  <div>
    <h1>
      Search - {props.data.query} ({props.data.total} results)
    </h1>
    <StoryGrid stories={props.data.stories} />
  </div>
);

export { SearchPage };
