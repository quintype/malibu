const React = require("react");

const { StoryGrid } = require("../story-grid.jsx");

class SearchPage extends React.Component {
  render() {
    return <div>
      <h1>Search - {this.props.data.query} ({this.props.data.total} results)</h1>
      <StoryGrid stories={this.props.data.stories} />
    </div>;
  }
}

exports.SearchPage = SearchPage;
