import React from "react";
import PT from "prop-types";

export function CloseIcon({ color = "#fff", width = 21, height = 21 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(-168 -859)" fillRule="nonzero">
          <g id="Group-12-Copy" transform="translate(168 859)">
            <g id="Group-16">
              <rect
                id="Rectangle-14"
                fill="transparent"
                width="24"
                height="24"
              />
              <g
                id="Group-36"
                transform="rotate(45 1.257 16.243)"
                stroke={color}
                strokeLinecap="square"
                strokeWidth="2"
              >
                <path d="M5.5,0.5 L5.5,11.5" id="Line-6" />
                <path d="M11,6 L0,6" id="Line-6" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

CloseIcon.propTypes = {
  color: PT.string,
  width: PT.number,
  height: PT.number
};
