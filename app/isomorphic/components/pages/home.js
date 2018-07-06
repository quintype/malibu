/* eslint-disable jsx-a11y/img-redundant-alt, import/extensions */
import React from "react";
import assetify from "@quintype/framework/assetify";

import { getCollectionTemplate } from "../get-collection-templates";
import img from "../../../assets/images/pw_maze_white.png";
import { DfpAd } from "../dfp-ad";
import { Collection } from '@quintype/components';

const HomePage = props => (
  <div>
    <h1>Home</h1>
    <Collection collection={props.data.collection} collectionTemplates={getCollectionTemplate} />
    <p>
      Here is an image: <img src={assetify(img)} border={1} alt="some image" />
    </p>
    <br />
    <p>
      Here is an ad: <DfpAd adtype="homepage-banner" />
    </p>
    <br />
  </div>
);

export { HomePage };
