import assetify from "@quintype/framework/assetify";
import { string } from "prop-types";
import React from "react";
import SocialMediaIcons from "../../atoms/social-media-icon";
import Logo from "../../basic/images/logo.svg";
import { Search } from "../search";
import "./top-header.m.css";

const TopHeader = ({ pageType }) => {
  return (
    <div styleName="container">
      <div styleName="first-child"></div>
      {pageType === "home-page" ? (
        <h1 styleName="logo">
          <a href="/" title="Prabhat Khabar - Hindi News">
            <img src={`${assetify(Logo)}`} alt="logo" />
          </a>
        </h1>
      ) : (
        <div styleName="logo">
          <a href="/" title="Prabhat Khabar - Hindi News">
            <img src={`${assetify(Logo)}`} alt="logo" />
          </a>
        </div>
      )}
      <div styleName="social-share">
        <div styleName="social-media">
          <SocialMediaIcons />
        </div>
        <div>
          {/* <img styleName="icon-bell" src={`${assetify(Bell)}`} alt="notification" /> */}
          <div styleName="search" id="searchId">
          </div>
        </div>
      </div>
    </div>
  );
};

TopHeader.propTypes = {
  pageType: string
};

export default TopHeader;
