import React from "react";
import PT from "prop-types";

export function Search({ color = "#d0021b", width = 16, height = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M-6.286-7h28.9v28.929h-28.9z" />
        <path
          fill="#1C1C1C"
          d="M6.788 11.968A5.885 5.885 0 0 0 12.67 6.08 5.885 5.885 0 0 0 6.788.19 5.885 5.885 0 0 0 .906 6.08a5.885 5.885 0 0 0 5.882 5.888zm0-1.14A4.746 4.746 0 0 1 2.044 6.08a4.746 4.746 0 0 1 4.744-4.75 4.746 4.746 0 0 1 4.744 4.75 4.746 4.746 0 0 1-4.744 4.748zm3.694-.167s.443-.339.805-.806c.405.282 4.655 4.582 4.655 4.582l-.805.806-4.655-4.582z"
        />
      </g>
    </svg>
  );
}

Search.propTypes = {
  color: PT.string,
  width: PT.number,
  height: PT.number
};
