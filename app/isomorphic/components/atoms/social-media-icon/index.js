import React from "react";
import { connect } from "react-redux";
import assetify from "@quintype/framework/assetify";
import { object } from "prop-types";
import get from "lodash/get";

import Facebook from "../../basic/images/facebook.svg";
import Youtube from "../../basic/images/youtube.svg";
import Twitter from "../../basic/images/twitter.svg";
import Instagram from "../../basic/images/instagram.svg";

import "./social-media-icon.m.css";

const SocialMediaIcons = ({ socialLinks = [] }) => {
  const list = [
    {
      componentName: Facebook,
      url: socialLinks && socialLinks["facebook-url"],
      alt: "facebook"
    },
    {
      componentName: Youtube,
      url: socialLinks && socialLinks["youtube-url"],
      alt: "Youtube"
    },
    {
      componentName: Twitter,
      url: socialLinks && socialLinks["twitter-url"],
      alt: "Twitter"
    },
    {
      componentName: Instagram,
      url: socialLinks && socialLinks["instagram-url"],
      alt: "Instagram"
    }
  ];

  return (
    <ul styleName="wrapper">
      {list.map((item, index) => {
        const SocialMediaIcon = item.componentName;
        return (
          item.url && (
            <li styleName="share-item" key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src={`${assetify(SocialMediaIcon)}`} alt={item.alt} />
              </a>
            </li>
          )
        );
      })}
    </ul>
  );
};

function mapStateToProps(state) {
  return {
    socialLinks: get(state, ["qt", "config", "social-links"], [])
  };
}

SocialMediaIcons.propTypes = {
  socialLinks: object
};

export default connect(mapStateToProps, () => ({}))(SocialMediaIcons);
