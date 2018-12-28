/* eslint-disable jsx-a11y/img-redundant-alt, import/extensions */
import React from "react";
import assetify from "@quintype/framework/assetify";
import { object, shape } from "prop-types";

import { getCollectionTemplate } from "../get-collection-template";
import img from "../../../assets/images/pw_maze_white.png";
import { LazyCollection, WithPreview, replaceAllStoriesInCollection, LazyLoadImages } from "@quintype/components";

export const HomePage = props => (
  <div>
    <h1>Home</h1>
    <LazyLoadImages>
      <LazyCollection collection={props.data.collection} collectionTemplates={getCollectionTemplate} lazyAfter={2} />
    </LazyLoadImages>
    <img src={assetify(img)} />
  </div>
);

HomePage.propTypes = {
  data: shape({
    collection: object
  })
};

export const HomePagePreview = WithPreview(HomePage, (data, story) =>
  Object.assign({}, data, {
    collection: replaceAllStoriesInCollection(data.collection, story)
  })
);
