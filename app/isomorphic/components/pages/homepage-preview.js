import React, { useState, useEffect } from "react";
import { HomePage } from "./home.js";
import { replaceAllStoriesInCollection } from "@quintype/components";
import { object } from "prop-types";

const HomePagePreview = (props) => {
  const [started, setStarted] = useState(false);
  const [data, setData] = useState(props.data);

  const collectStoryData = () => {
    global.addEventListener("message", (event) => {
      if (event.data.story) {
        setStarted(true);
        const storyData = Object.assign({}, data, {
          collection: props.data.collection
            ? replaceAllStoriesInCollection(props.data.collection, event.data.story)
            : null,
        });
        setData(storyData);
      }
    });
  };

  useEffect(() => {
    collectStoryData();
  }, []);

  if (!started) return <div />;
  return <HomePage data={data} />;
};

HomePagePreview.propTypes = {
  data: object,
};

export { HomePagePreview };
