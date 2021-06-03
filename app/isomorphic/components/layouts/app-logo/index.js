import React from "react";
import { Link } from "@quintype/components";

import "./app-logo.m.css";

const AppLogo = () => {
  return (
    <Link href="/">
      <svg
        height="36"
        width="178"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 997.64 195.19"
      >
        <polygon
          className="cls-1"
          fill="#2ac7a4"
          points="107.91 170.72 36.93 131.06 36.93 53.16 107.91 92.83 107.91 170.72"
        />
        <polygon
          className="cls-2"
          fill="#0e8167"
          points="144.37 170.72 215.34 131.06 215.34 53.16 144.37 92.83 144.37 170.72"
        />
        <polygon
          className="cls-3"
          stroke="#2ac7a4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2px"
          opacity="0.8"
          fill="none"
          points="126.09 144.13 55.12 104.46 55.12 26.57 126.09 66.24 126.09 144.13"
        />
        <polyline
          className="cls-3"
          stroke="#2ac7a4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2px"
          opacity="0.8"
          fill="none"
          points="126.09 144.13 197.16 104.67 197.16 26.78 126.18 66.44"
        />
        <text
          className="cls-4"
          fontSize="171.12px"
          fontFamily="Montserrat-Bold, Montserrat"
          fontWeight="700"
          fill="#586965"
          transform="translate(254.8 158.61)"
        >
          MALIBU
        </text>
      </svg>
    </Link>
  );
};

export { AppLogo };
