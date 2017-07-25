const React = require("react");

const { Link } = require("../link");

function SectionPageStoryItem(props) {
  return <Link href={"/" + props.story.slug} className="sectionpage-story-item foo">{props.story.headline}</Link>;
}

class SectionPage extends React.Component {
  render() {
    return <div>
      {this.props.data.stories.map((story, index) => <SectionPageStoryItem story={story} key={index}></SectionPageStoryItem>)}
    </div>;
  }
}

exports.SectionPage = SectionPage;
