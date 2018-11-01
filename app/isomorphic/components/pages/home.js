/* eslint-disable jsx-a11y/img-redundant-alt, import/extensions */
import React from "react";
import assetify from "@quintype/framework/assetify";
import { object, shape } from "prop-types";

import { getCollectionTemplate } from "../get-collection-template";
import img from "../../../assets/images/pw_maze_white.png";
import { LazyCollection } from "@quintype/components";

export const HomePage = props => (
  <div>
    <h1>Home</h1>
    <LazyCollection
      collection={props.data.collection}
      collectionTemplates={getCollectionTemplate}
      lazyAfter={2}
    />
    <img src={assetify(img)} />
  </div>
);

HomePage.propTypes = {
  data: shape({
    collection: object
  })
}