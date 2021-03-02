import React from "react";
import PT from "prop-types";
import { Link } from "@quintype/components";

import "./menu-item.m.css";

const MenuItem = ({ item, toggleHandler }) => {
  if (item["item-type"] === "placeholder") {
    return <span styleName="menu-link">{item.title}</span>;
  } else if (item["item-type"] === "link") {
    return (
      <a
        styleName="menu-link"
        onClick={toggleHandler}
        className="menu-link"
        target="_blank"
        rel="noopener noreferrer"
        href={item.completeUrl || "/"}
      >
        {item.title}
      </a>
    );
  } else {
    return (
      <Link styleName="menu-link" callback={toggleHandler} className="menu-link" href={item.completeUrl || "/"}>
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
