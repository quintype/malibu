import React from "react";
import "./card-left-image.m.css";

function CardLeftImage({story, modifier, getImageUrl}) {
  console.log('modifier', modifier);
  return(
    <React.Fragment>
      <div styleName="CardLeftImageContent">
      <picture >
        <source media="(max-width: 799px)" srcset={getImageUrl(story['hero-image-s3-key'])} />
        <source media="(min-width: 800px)" srcset={getImageUrl(story['hero-image-s3-key'])} />
        <img styleName="CardLeftImg" src={getImageUrl(story['hero-image-s3-key'])} alt=""/>
      </picture>
      <h2 styleName="CardLeftImageHeading">{story.headline}</h2>
      </div>
    </React.Fragment>

  );
}
export {CardLeftImage}


