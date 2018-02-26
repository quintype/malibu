import React from "react";

import { StoryGrid } from "../story-grid";

const SectionPage = props => (
  <div>
    <h1>
      {`Section - ${props.data.section["display-name"] ||
        props.data.section.name}`}
    </h1>
    <StoryGrid stories={props.data.stories} />
  </div>
);

export { SectionPage };
