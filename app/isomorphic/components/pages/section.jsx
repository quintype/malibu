const React = require("react");

const { StoryGrid } = require("../story-grid.jsx");

class SectionPage extends React.Component {
  render() {
    return <div>
      <h1>Section - {this.props.data.section["display-name"] || this.props.data.section["name"]}</h1>
      <StoryGrid stories={this.props.data.stories} />
    </div>;
  }
}

exports.SectionPage = SectionPage;
