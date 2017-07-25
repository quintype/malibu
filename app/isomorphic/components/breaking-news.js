const React = require("react");
const {connect} = require("react-redux");
const {BREAKING_NEWS_UPDATED} = require('../actions');

class BreakingNewsBase extends React.Component {
  render() {
    if(this.props.breakingNews.length == 0) {
      return <span/>;
    }
    return <ul className="breaking-news">
      {this.props.breakingNews.map(story => breakingNewsItem(story))}
    </ul>;

    function breakingNewsItem(story) {
      return <li>{story.headline}</li>
    }
  }

  updateBreakingNews() {
    superagent.get('/api/v1/breaking-news')
      .then(response => this.props.breakingNewsUpdated(response.body.stories));
  }

  componentDidMount() {
    this.interval = global.setInterval(() => this.updateBreakingNews(), this.props.updateInterval || 60000);
    this.updateBreakingNews();
  }
}

function mapStateToProps(state) {
  return {
    breakingNews: state.breakingNews || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    breakingNewsUpdated: (stories) => dispatch({type: BREAKING_NEWS_UPDATED, stories: stories})
  };
}

exports.BreakingNews = connect(mapStateToProps, mapDispatchToProps)(BreakingNewsBase);
