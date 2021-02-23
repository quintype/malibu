import React from "react";
import { Link } from "@quintype/components";
import assetify from "@quintype/framework/assetify";

import "./styles.m.css";

import logo from "./newIcon.png";

function AppLogo() {
  return (
    <div>
      <Link href="/">
        <img styleName="malibu-icon-logo" srcSet={` ${assetify(logo)}`} src={assetify(logo)} alt="Logo" />
      </Link>
    </div>
  );
}

export { AppLogo };
