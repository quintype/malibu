import { wrapCollectionLayout, EagerLoadImages } from "@quintype/components";
import { FourColGrid } from "../four-col-grid";
import React from "react";

function wrapEager(f) {
  return function WrapEager(props) {
    if (props.index === 0) {
      return (
        <EagerLoadImages predicate={token => token === "above-fold"}>{React.createElement(f, props)}</EagerLoadImages>
      );
    } else {
      return React.createElement(f, props);
    }
  };
}

export default {
  FourColGrid: wrapEager(wrapCollectionLayout(FourColGrid)),
  defaultTemplate: wrapEager(wrapCollectionLayout(FourColGrid))
};
