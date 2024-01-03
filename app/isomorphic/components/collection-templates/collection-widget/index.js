import React from "react";
import { object } from "prop-types";
import get from "lodash/get";

import "./collection-widget.m.css";

const CollectionWidget = ({ collection }) => {
  const content = get(collection, ["associated-metadata", "content"], "");

  return <div styleName="wrapper" dangerouslySetInnerHTML={{ __html: content }}></div>;
};

CollectionWidget.propTypes = {
  collection: object,
};

export default CollectionWidget;
