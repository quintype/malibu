const React = require("react");

class StoryPage extends React.Component {
  render() {
    return <h1>{this.props.data.story.headline}</h1>;
  }
}

exports.StoryPage = StoryPage;
