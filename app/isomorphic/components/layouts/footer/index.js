import React from "react";
import { connect } from "react-redux";
import { array, string } from "prop-types";
import get from "lodash/get";
import { Link } from "@quintype/components";
import assetify from "@quintype/framework/assetify";

import Logo from "../../basic/images/logo-white.svg";
import SocialMediaIcons from "../../atoms/social-media-icon";

import "./footer.m.css";

const StaticFooterLinks = ({ staticFooterLinks }) => {
  return (
    <ul styleName="static-link">
      {staticFooterLinks.length >= 1 &&
        staticFooterLinks.map(item => {
          return item.isExternalLink ? (
            <li styleName="static-link-list" key={item.title}>
              <a href={item.completeUrl} styleName="static-link-item">
                {item.title}
              </a>
            </li>
          ) : (
            <li styleName="static-link-list" key={item.title}>
              <Link href={item.completeUrl || "/"} styleName="static-link-item">
                {item.title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

const FooterMenuLinks = ({ footerMenuLinks }) => {
  return (
    <React.Fragment>
      {footerMenuLinks.length >= 1 && (
        <ul styleName="menu-link">
          <li styleName="trending-tags">Trending Tags</li>
          {footerMenuLinks.map(item => {
            return item.isExternalLink ? (
              <li key={item} styleName="footer-item">
                <a styleName="link" rel="noopener noreferrer" href={item.completeUrl}>
                  {item.title}
                </a>
              </li>
            ) : (
              <li key={item} styleName="footer-item">
                <Link href={item.completeUrl || "/"} styleName="link">
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

const Copyright = ({ copyrightText = "" }) => {
  return (
    <ul styleName="copy-right">
      <li styleName="copy-right-text">{copyrightText}</li>
      <li>
        <a href="https://www.quintype.com" styleName="powered-by-link" target="_blank" rel="noopener noreferrer">
          Powered by quintype
        </a>
      </li>
    </ul>
  );
};

const FooterBase = props => {
  return (
    <div styleName="wrapper">
      <div styleName="inner-wrapper">
        <div styleName="top-row">
          <FooterMenuLinks footerMenuLinks={props.footerMenuLinks} />
          <div styleName="social-media">
            <SocialMediaIcons />
          </div>
        </div>
        <div styleName="static-row">
          <div styleName="logo">
            <a href="/" title="Prabhat Khabar - Hindi News">
              <img src={`${assetify(Logo)}`} alt="notification" />
            </a>
          </div>
          <div>
            <StaticFooterLinks staticFooterLinks={props.staticFooterLinks} />
            <Copyright copyrightText={props.copyrightText} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    copyrightText: get(state, ["qt", "config", "publisher-settings", "copyright"], ""),
    staticFooterLinks: get(state, ["qt", "data", "navigationMenu", "footerStaticMenuLinks"], []),
    footerMenuLinks: get(state, ["qt", "data", "navigationMenu", "bigFooterLinks"], [])
  };
};

StaticFooterLinks.propTypes = {
  staticFooterLinks: array
};

FooterMenuLinks.propTypes = {
  footerMenuLinks: array
};

Copyright.propTypes = {
  copyrightText: string
};

FooterBase.propTypes = {
  copyrightText: string,
  staticFooterLinks: array,
  footerMenuLinks: array
};

const Footer = connect(mapStateToProps)(FooterBase);

export { Footer };
