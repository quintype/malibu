import React from "react";

import { StoryGrid } from "../story-grid.js";
import img from '../../../assets/images/pw_maze_white.png'

import assetify from '@quintype/framework/assetify';

class HomePage extends React.Component {
  render() {
    return <div>
      <h1>Home</h1>
      <StoryGrid stories={this.props.data.stories} />
      Here is an image:
      <img src={assetify(img)} />
    </div>;
  }
}

export { HomePage };
