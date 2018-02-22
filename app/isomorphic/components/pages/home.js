/* eslint-disable jsx-a11y/img-redundant-alt, import/extensions */
import React from "react";
import assetify from '@quintype/framework/assetify';

import { StoryGrid } from "../story-grid";
import img from '../../../assets/images/pw_maze_white.png'
import {DfpAd} from '../dfp-ad'

const HomePage = (props) => (
  <div>
    <h1>Home</h1>
    <StoryGrid stories={props.data.stories} />
    Here is an image: <img src={assetify(img)} border={1} alt="some image" /> <br />
    Here is an ad: <DfpAd adtype="homepage-banner" /> <br />
  </div>
);

export { HomePage };
