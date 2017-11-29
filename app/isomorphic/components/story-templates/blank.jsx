const React = require("react");

const { Link } = require("@quintype/framework/components/link");
const { ResponsiveImage } = require("@quintype/framework/components/responsive-image");
const { StoryElement } = require("@quintype/framework/components/story-element");

function StoryCard(props){
  return <div>
    {props.card['story-elements'].map((element, index) => <StoryElement element={element} key={index} story={props.story}></StoryElement>)}
  </div>
}

function BlankStoryTemplate(props) {
  return <div className="blank-story">
      <figure className="blank-story-image qt-image-16x9">
        <ResponsiveImage slug={props.story["hero-image-s3-key"]} metadata={props.story["hero-image-metadata"]}
          aspectRatio={[16,9]}
          defaultWidth={480} widths={[250,480,640]} sizes="(max-width: 500px) 98%, (max-width: 768px) 48%, 23%"
          imgParams={{auto:['format', 'compress']}}/>
      </figure>
      <h1>{props.story.headline}</h1>
      <span className="blank-story-author">{props.story['author-name']}</span>
      {props.story.cards.map((card, index) => <StoryCard key={index} card={card} story={props.story}/>)}
      <div className="space-before-next-story" style={{minHeight: 100}}/>
    </div>;
}

function BlankStory(props) {
  return <div className="story-grid">
    <BlankStoryTemplate story={props.story}></BlankStoryTemplate>
  </div>;
}

exports.BlankStory = BlankStory;
