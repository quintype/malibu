import React, { useEffect, useState } from "react";
import { ResponsiveImage } from "@quintype/components";
import { shape, string, object, bool } from "prop-types";

import "./card-image.m.css";

export const CardImage = ({ story, isInitRow }) => {
  const imagePerfObj = isInitRow ? { size: "3vw", blur: 0 } : { size: "25vw", blur: 0 };
  const [perfObj, setPerfObj] = useState(imagePerfObj);

  useEffect(() => {
    if (isInitRow) {
      setTimeout(() => {
        setPerfObj({ size: "30vw", blur: 0 });
      }, 2500);
    }
  }, []);

  return (
    <figure className="qt-image-16x9" styleName={`card-image ${!story["hero-image-s3-key"] ? "placeholder" : ""}`}>
      {story["hero-image-s3-key"] && (
        <ResponsiveImage
          slug={story["hero-image-s3-key"]}
          metadata={story["hero-image-metadata"]}
          aspectRatio={[16, 9]}
          defaultWidth={480}
          widths={[250, 480, 640]}
          sizes={perfObj.size}
          imgParams={{ auto: ["format", "compress"], blur: perfObj.blur }}
          alt={story.headline || ""}
        />
      )}
    </figure>
  );
};

const storyPropType = shape({
  id: string,
  slug: string,
  "hero-image-s3-key": string,
  "hero-image-metadata": object,
  headline: string,
  "author-name": string
});

CardImage.propTypes = {
  story: storyPropType,
  isInitRow: bool
};
