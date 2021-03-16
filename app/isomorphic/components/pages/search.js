import React from "react";
import PropTypes from "prop-types";

import { StoryGrid } from "../story-grid";

const SearchPage = props => (
  <div className="container">
    <h1>
      Search - {props.data.query} ({props.data.total} results)
    </h1>
    <StoryGrid stories={props.data.stories} />
  </div>
);

SearchPage.propTypes = {
  data: PropTypes.object
};

export { SearchPage };
