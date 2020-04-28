/* eslint-disable jsx-a11y/img-redundant-alt, import/extensions */
import { LazyCollection, LazyLoadImages, replaceAllStoriesInCollection, WithPreview } from "@quintype/components";
import assetify from "@quintype/framework/assetify";
import { object, shape } from "prop-types";
import React from "react";
import img from "../../../assets/images/pw_maze_white.png";
import { getCollectionTemplate } from "../get-collection-template";

export const HomePage = props => (
  <div>
    <h1>Home Page</h1>
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
