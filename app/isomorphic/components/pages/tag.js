import { get } from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { StoryGrid } from "../story-grid";

const TagPage = props => (
  <div>
    <h1>{get(props, "data.tag.name") || "Tag Page"}</h1>
    <StoryGrid stories={props.data.stories} />
  </div>
);

export { TagPage };
TagPage.propTypes = {
  data: PropTypes.object
};
