/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef } from "react";
import { object } from "prop-types";
import get from "lodash/get";

import "./collection-widget.m.css";

export function CollectionWidget({ collection }) {
  const content = get(collection, ["associated-metadata", "content"], "");
  const widgetRef = useRef(null);

  useEffect(() => {
    const slotHtml = document.createRange().createContextualFragment(content);

    widgetRef.current.innerHTML = "";
    widgetRef.current.appendChild(slotHtml);
  },[]);

  return (
    <div styleName="wrapper">
      <div ref={widgetRef} />
    </div>
  );
}

CollectionWidget.propTypes = {
  collection: object,
};
