import React from "react";
import { Link } from "@quintype/components";
import assetify from "@quintype/framework/assetify";

import "./styles.m.css";

import logo from "./publisher-logo.png";

function AppLogo() {
  return (
    <div>
      <Link href="/">
        <img styleName="publisher-logo" srcSet={` ${assetify(logo)}`} src={assetify(logo)} alt="Logo" />
      </Link>
    </div>
  );
}

export { AppLogo };
