import React from "react";
import "./card-top-image.m.css";
function CardTopImage({story, modifier,getImageUrl}) {
  return (
    <div styleName={`CardTopImage--${modifier}`}>
      <picture styleName="CardTopImageContainer">
        <source media="(max-width: 799px)" srcset={getImageUrl(story['hero-image-s3-key'])} />
        <source media="(min-width: 800px)" srcset={getImageUrl(story['hero-image-s3-key'])} />
        <img styleName="CardTopImg" src={getImageUrl(story['hero-image-s3-key'])} alt=""/>
      </picture>
      <h2 styleName="Headline">{story.headline}</h2>
    </div>
  );
}
export {CardTopImage}


