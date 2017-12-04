import React from "react";

import { StoryGrid } from "../story-grid.js";

class HomePage extends React.Component {
  render() {
    return <div>
      <h1>Home</h1>
      <StoryGrid stories={this.props.data.stories} />
    </div>;
  }
}

export { HomePage };
