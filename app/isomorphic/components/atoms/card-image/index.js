import React, { useEffect, useState } from "react";
import { ResponsiveImage } from "@quintype/components";
import { shape, string, object, bool } from "prop-types";

import "./card-image.m.css";

export const CardImage = ({ story, isInitRow, pageType }) => {
  const imagePerfObj = isInitRow ? { size: "3vw", blur: 0 } : { size: "25vw", blur: 0 };
  const [perfObj, setPerfObj] = useState(imagePerfObj);
  const customStyleName = pageType !== "story-page" && !story["hero-image-s3-key"] ? "placeholder" : "";

  const perfImageTimeout = (size, blur) => {
    setTimeout(() => {
      setPerfObj({ size, blur });
    }, 2500);
  };

  useEffect(() => {
    if (isInitRow) {
      if (pageType === "story-page") {
        perfImageTimeout("50vw", 0);
      } else {
        perfImageTimeout("25vw", 0);
      }
    }
  }, []);

  return (
    <figure className="qt-image-16x9" styleName={`card-image ${customStyleName}`}>
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
  isInitRow: bool,
  pageType: string
};
