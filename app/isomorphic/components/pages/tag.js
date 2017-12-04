import React from "react";

import { StoryGrid } from "../story-grid.js";

class TagPage extends React.Component {
  render() {
    return <div>
      <h1>Tag Page</h1>
      <StoryGrid stories={this.props.data.stories} />
    </div>;
  }
}

export { TagPage };
