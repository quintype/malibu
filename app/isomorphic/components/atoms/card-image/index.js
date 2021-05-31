import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { ResponsiveImage } from "@quintype/components";
import { shape, string, object, bool } from "prop-types";
import { useSelector } from "react-redux";

import "./card-image.m.css";

export const CardImage = ({ story, isInitRow, pageType }) => {
  const progressiveImageConfig = useSelector(state =>
    get(state, ["qt", "config", "publisher-attributes", "progressive_image"], {})
  );

  const imagePerfObj =
    progressiveImageConfig.is_enable && isInitRow ? progressiveImageConfig.initial_load : { size: "25vw", blur: 0 };
  const [perfObj, setPerfObj] = useState(imagePerfObj);
  const customStyleName = pageType !== "story-page" && !story["hero-image-s3-key"] ? "placeholder" : "";

  useEffect(() => {
    if (isInitRow && progressiveImageConfig.is_enable) {
      // if we need progressive loading for the images in the page, isInitRow condition can be removed
      const timer = () => {
        setTimeout(() => {
          setPerfObj(progressiveImageConfig.subsequent_load);
          clearTimeout(timer);
        }, progressiveImageConfig.transition_timeout || 2500);
      };

      timer();
    }
  }, []);

  const getImageSize = () => {
    if (pageType === "story-page") {
      return perfObj.story_page_size;
    }
    return perfObj.generic_size;
  };

  return (
    <figure className="qt-image-16x9" styleName={`card-image ${customStyleName}`}>
      {story["hero-image-s3-key"] && (
        <ResponsiveImage
          slug={story["hero-image-s3-key"]}
          metadata={story["hero-image-metadata"]}
          aspectRatio={[16, 9]}
          defaultWidth={480}
          widths={[250, 480, 640]}
          sizes={getImageSize()}
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
