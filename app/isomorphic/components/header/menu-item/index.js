import React, { Fragment } from "react";
import PT from "prop-types";
import { Link } from "@quintype/components";

import "./menu-item.m.css";

const MenuItem = ({ item, toggleHandler }) => {
  if (item.isExternalLink) {
    return (
      <a styleName="menu-link" onClick={toggleHandler} className="menu-link" target="_blank" rel="noopener noreferrer" href={item.url || "/"}>
        {item.title}
      </a>
    );
  } else {
    return (
      <Link styleName="menu-link" onClick={toggleHandler} className="menu-link" href={item.url || "/"}>
        {item.title}
      </Link>
    );
  }
};

MenuItem.propTypes = {
  item: PT.object,
  showIcon: PT.bool
};

export { MenuItem };
