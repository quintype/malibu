/* eslint-disable jsx-a11y/img-redundant-alt, import/extensions */
import React from "react";
import assetify from "@quintype/framework/assetify";

import { getCollectionTemplate } from "../get-collection-template";
import img from "../../../assets/images/pw_maze_white.png";
import { DfpAd } from "../dfp-ad";
import { Collection } from '@quintype/components';
import { Header } from "../layouts/header.js";
import { TwoCol } from "../collection-templates/two-col.js";
import { ThreeCol } from "../collection-templates/three-col.js"
import './home.m.css';

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
    heading: 'education'
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
};

const logo = {
  url: 'https://d1y1r594kapmgi.cloudfront.net/sakshipost/assets/sakshipost-logo-416180c61c1e354365e90d654b29a29dcfc0f7c33f20a930430499d9d58d724f.jpg'

};
const NavMenu =[{
  url: '#',
  name: 'News',
  children: [{
    url: '#',
    name: 'Market',
  }, {
    url: '#',
    name: 'Bollybood',
  }]
}, {
  url: '#',
  name: 'Delhi',
}, {
  url: '#',
  name: 'Market',
}, {
  url: '#',
  name: 'Bollybood',
}, {
  url: '#',
  name: 'Travel',
},{
  url: '#',
  name: 'Entertainment',
}, {
  url: '#',
  name: 'Praja Sankalpa Yatra',
}];



const HomePage = props => {
  console.log(props.config['cdn-image']);
  function getImageUrl(imgUrl) {
    return (

       `https://${props.config['cdn-image']}/${imgUrl}`
    );
  }

  return (
    <div>
      <Header menu={menu} logo={logo} NavMenu={NavMenu}/>
      <TwoCol stories={props.data.collection.items[0].items}  collection={props.data.collection.items[0]} getImageUrl={getImageUrl}/>
      <ThreeCol stories={props.data.collection.items[1].items}  collection={props.data.collection} getImageUrl={getImageUrl}/>
    </div>
  );
};




export { HomePage };
