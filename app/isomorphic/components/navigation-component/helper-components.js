import React from "react";
import PT from "prop-types";
import { Link } from "@quintype/components";

function MenuItem(props) {
  // TODO: Add submenu support
  return props.item.isExternalLink ? (
    <a href={props.item.completeUrl} target="_blank" rel="noopener noreferrer">
      {props.item.title}
    </a>
  ) : (
    <Link href={props.item.completeUrl}>{props.item.title}</Link>
  );
}

MenuItem.propTypes = {
  item: PT.shape({
    isExternalLink: PT.bool,
    completeUrl: PT.string,
    title: PT.string
  })
};

export { MenuItem };
