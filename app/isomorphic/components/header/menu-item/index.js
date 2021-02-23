import React from "react";
import PT from "prop-types";
import { Link } from "@quintype/components";
import assetify from "@quintype/framework/assetify";

import ArrowDownIcon from "../../atoms/icons/arrow-down.svg";

import "./menu-item.m.css";

function MenuItem({ item, showIcon = true }) {
  return item.isExternalLink ? (
    <a styleName="menu-link" className="menu-link" target="_blank" rel="noopener noreferrer" href={item.url || "/"}>
      {item.title}{" "}
      {item.children.length >= 1 && showIcon && (
        <img width="16px" height="16px" src={`${assetify(ArrowDownIcon)}`} alt="down-arrow" />
      )}
    </a>
  ) : (
    <Link styleName="menu-link" className="menu-link" href={item.url || "/"}>
      {item.title}{" "}
      {item.children.length >= 1 && showIcon && <img src={`${assetify(ArrowDownIcon)}`} alt="down-arrow" />}
    </Link>
  );
}

MenuItem.propTypes = {
  item: PT.object,
  showIcon: PT.bool
};

export { MenuItem };
