import React from "react";
import PT from "prop-types";
import { Link } from "@quintype/components";

import "./menu-item.m.css";

const MenuItem = ({ item, toggleHandler, menuStyle = "menu-link" }) => {
  if (item["item-type"] === "placeholder") {
    return <span styleName="menu-link">{item.title}</span>;
  } else if (item["item-type"] === "link") {
    return (
      <a
        styleName={menuStyle}
        onClick={toggleHandler}
        className={menuStyle}
        target="_blank"
        rel="noopener noreferrer"
        href={item.completeUrl || "/"}
      >
        {item.title}
      </a>
    );
  } else {
    return (
      <Link styleName={menuStyle} callback={toggleHandler} className={menuStyle} href={item.completeUrl || "/"}>
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
