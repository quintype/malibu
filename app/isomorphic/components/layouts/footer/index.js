import React from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import get from "lodash/get";
import { Link } from "@quintype/components";
import "./styles.m.css";

const FooterBase = ({ footerLinks }) => (
  <div styleName="footer">
    {footerLinks.map(
      item =>
        item.isExternalLink ? (
          <a
            href={item.completeUrl}
            target="_blank"
            rel="noopener noreferrer"
            styleName="link"
          >
            {item.title}
          </a>
        ) : (
          <Link href={item.completeUrl} styleName="link">
            {item.title}
          </Link>
        )
    )}
  </div>
);

function mapStateToProps(state) {
  return {
    footerLinks: get(state, ["qt", "data", "navigationMenu", "footerLinks"], [])
  };
}

FooterBase.propTypes = {
  footerLinks: PT.arrayOf(
    PT.shape({
      isExternalLink: PT.bool,
      completeUrl: PT.string,
      title: PT.string
    })
  )
};

export const Footer = connect(
  mapStateToProps,
  null
)(FooterBase);
