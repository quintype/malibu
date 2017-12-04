const React = require("react");

const { StoryPage } = require("./story.js");

class StoryPublicPagePreview extends React.Component {
  render() {
    return <StoryPage data={this.props.data}/>
  }
}

exports.StoryPublicPagePreview = StoryPublicPagePreview;
