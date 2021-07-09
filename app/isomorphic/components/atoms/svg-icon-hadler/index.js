import React from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { string, object } from "prop-types";

if (require.context) {
  const req = require.context("../../../../assets/icons/", true, /\.svg$/);
  req.keys().forEach(filename => req(filename));
}

export const SvgIconHandler = ({
  type,
  className = "",
  iconStyle = {},
  width = "16",
  height = "16",
  viewBox = "0 0 16 16"
}) => {
  const svgSpritePath = useSelector(state => get(state, ["qt", "config", "svgSpritePath"], ""));

  return (
    <svg className={className} style={iconStyle} width={width} height={height} viewBox={viewBox}>
      <use href={`${svgSpritePath}#${String(type).toLowerCase()}`} />
    </svg>
  );
};

SvgIconHandler.propTypes = {
  type: string,
  className: string,
  iconStyle: object,
  width: string,
  height: string,
  viewBox: string
};
