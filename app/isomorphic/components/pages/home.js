/* eslint-disable jsx-a11y/img-redundant-alt, import/extensions */
import React from "react";
import assetify from "@quintype/framework/assetify";

import { getCollectionTemplate } from "../get-collection-template";
// import { Twocolninecomponent } from "../Twocolninecomponent";

import { Header } from "../layouts/header";
import { Nav } from "../layouts/nav";

import img from "../../../assets/images/pw_maze_white.png";
import { DfpAd } from "../dfp-ad";
import { Collection } from '@quintype/components';

const menu = {
  externalLinks: [{
    url: '#',
    heading: 'Telungu'
  }, {
    url: '#',
    heading: 'Hindi'
  }, {
    url: '#',
    heading: 'E-Paper'
  }, {
    url: '#',
    heading: 'Education'
  }],
  socialLinks: [{
    url: '#',
    heading: 'Facebook',
    type: 'facebook'
  }, {
    url: '#',
    heading: 'Twitter',
    type: 'twitter'
  }]
}

const logo = {
  url: 'https://d1y1r594kapmgi.cloudfront.net/sakshipost/assets/sakshipost-logo-416180c61c1e354365e90d654b29a29dcfc0f7c33f20a930430499d9d58d724f.jpg',
  heading: 'sakshipost'
}

const HomePage = props => {
  return (
    <div>
      <Header menu={menu} logo={logo} />
    </div>
  )
};

export { HomePage };
