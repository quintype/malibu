import React from "react";
import { string, shape, number, object } from "prop-types";

import { StoryGrid } from "../story-grid";

const SearchPage = (props) => (
  <div>
    <h1>
      Search - {props.data.query} ({props.data.total} results)
    </h1>
    <StoryGrid stories={props.data.stories} />
  </div>
);

SearchPage.propTypes = {
  data: shape({
    query: string,
    total: number,
    stories: object,
  }),
};

export { SearchPage };
