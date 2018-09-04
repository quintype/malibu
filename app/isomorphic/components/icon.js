import React from "react";
import "./icon.m.css";

const Icon = props => {
  return <a href="#" className={`fa fa-${props.iconType}`} styleName={`${props.iconType}`}> </a>;
}

export {Icon};
