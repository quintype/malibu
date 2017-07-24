const React = require("react");

const { Link } = require("../link");

function HomePageStoryItem(props) {
  return <Link href={"/" + props.story.slug} className="homepage-story-item">{props.story.headline}</Link>;
}

class HomePage extends React.Component {
  render() {
    return <div>
      {this.props.data.stories.map((story, index) => <HomePageStoryItem story={story} key={index}></HomePageStoryItem>)}
    </div>;
  }
}

exports.HomePage = HomePage;
