import React, { useState, useEffect } from "react";
import { StoryPage } from "./story";
import { object } from "prop-types";

const StoryPagePreview = (props) => {
  const [data, setData] = useState(null);

  const collectStoryData = () => {
    global.addEventListener("message", (event) => {
      if (event.data.story) {
        setData(event.data);
      }
    });
  };

  useEffect(() => {
    collectStoryData();
  }, []);

  return <StoryPage data={data} config={props.config} isPreview={true} />;
};

StoryPagePreview.propTypes = {
  config: object,
};

export { StoryPagePreview };
