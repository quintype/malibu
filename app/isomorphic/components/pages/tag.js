const React = require("react");

const { StoryGrid } = require("../story-grid.js");

class TagPage extends React.Component {
  render() {
    return <div>
      <h1>Tag Page</h1>
      <StoryGrid stories={this.props.data.stories} />
    </div>;
  }
}

exports.TagPage = TagPage;
