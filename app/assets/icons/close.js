import React from "react";

const CloseIcon = ({ size = 24, color = "#333", className}) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="nonzero" stroke={color} stroke-linecap="square" stroke-width="2">
        <path d="M16.95 6.914l-9.9 9.9M16.95 17.107l-9.9-9.9"/>
    </g>
  </svg>
);

export { CloseIcon };
