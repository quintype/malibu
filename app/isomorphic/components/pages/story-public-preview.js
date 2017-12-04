import React from "react";

import { StoryPage } from "./story.js";

class StoryPublicPagePreview extends React.Component {
  render() {
    return <StoryPage data={this.props.data}/>
  }
}

export { StoryPublicPagePreview };
