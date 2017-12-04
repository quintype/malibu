const React = require("react");
const { HomePage } = require("./home.js");

class HomePagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.collectStoryData();
  }

  collectStoryData() {
    global.addEventListener("message", (event) => {
      if (event.data.story) {
        this.setState({stories: Array(10).fill(event.data.story)});
      }
    });
  }

  render() {
    if (!this.state.stories) return <div></div>;
    return <HomePage data={this.state}/>
  }
}

exports.HomePagePreview = HomePagePreview;
