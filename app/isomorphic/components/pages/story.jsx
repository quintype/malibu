const React = require("react");

const { BlankStory } = require("../story-templates/blank.jsx");

class StoryPage extends React.Component {
  render() {
    return <BlankStory story={this.props.data.story}/>;
  }
}

exports.StoryPage = StoryPage;
