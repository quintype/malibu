import React from "react";
import { Link } from "@quintype/components";

import assetify from "@quintype/framework/assetify";

import logo from "../../../../assets/images/malibu_logo_new.png";

import "./app-logo.m.css";

const AppLogo = () => (
  <Link href="/">
    <img
      height="36"
      width="178"
      loading="lazy"
      styleName="publisher-logo"
      srcSet={assetify(logo)}
      data-src={assetify(logo)}
      alt="Logo"
    />
  </Link>
);

export { AppLogo };
