import React from "react";

import { StoryGrid } from "../story-grid.js";

class SearchPage extends React.Component {
  render() {
    return <div>
      <h1>Search - {this.props.data.query} ({this.props.data.total} results)</h1>
      <StoryGrid stories={this.props.data.stories} />
    </div>;
  }
}

export { SearchPage };
