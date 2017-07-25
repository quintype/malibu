const React = require("react");

const { Link } = require("../link");
const { ResponsiveImage } = require("../responsive-image")

function HomePageStoryItem(props) {
  return <Link href={"/" + props.story.slug} className="homepage-story-item">
      <figure className="homepage-story-item-image qt-image-16x9">
        <ResponsiveImage slug={props.story["hero-image-s3-key"]} metadata={props.story["hero-image-metadata"]}
          aspectRatio={[16,9]}
          defaultWidth={480} widths={[250,480,640]} sizes="(max-width: 500px) 98%, (max-width: 768px) 48%, 23%"
          imgParams={{auto:['format', 'compress']}}/>
      </figure>
      <h2>{props.story.headline}</h2>
      <span className="homepage-story-author">{props.story['author-name']}</span>
    </Link>;
}

class HomePage extends React.Component {
  render() {
    return <div>
      {this.props.data.stories.map((story, index) => <HomePageStoryItem story={story} key={index}></HomePageStoryItem>)}
    </div>;
  }
}

exports.HomePage = HomePage;
