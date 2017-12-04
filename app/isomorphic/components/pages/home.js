const React = require("react");

const { StoryGrid } = require("../story-grid.js");

class HomePage extends React.Component {
  render() {
    return <div>
      <h1>Home</h1>
      <StoryGrid stories={this.props.data.stories} />
    </div>;
  }
}

exports.HomePage = HomePage;
