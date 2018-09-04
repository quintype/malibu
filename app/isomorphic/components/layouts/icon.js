import React from "react";
import "./icon.m.css";

let Icon = props => {
  return <a href="#" key={props.icontype} className={`fa fa-${props.icontype}`} styleName={props.icontype}></a>;
}

export {Icon}
