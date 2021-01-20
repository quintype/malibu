import React from "react";
import PT from "prop-types";

export const FbIcon = ({ width = 12, height = 21, color = "#fff" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 12 21">
      <path
        fill={color}
        fillRule="evenodd"
        d="M8.578 3.644a.636.636 0 0 0-.305.092.862.862 0 0 0-.28.25c-.08.106-.142.235-.188.387-.047.152-.07.32-.07.501v2.414H12v3.417H7.734V21H3.656V10.705H0V7.288h3.656V5.24c0-.699.125-1.367.375-2.005A5.496 5.496 0 0 1 5.062 1.55 4.732 4.732 0 0 1 6.61.41 4.658 4.658 0 0 1 8.579 0H12v3.644H8.578"
      />
    </svg>
  );
};

FbIcon.propTypes = {
  color: PT.string,
  width: PT.number,
  height: PT.number
};
