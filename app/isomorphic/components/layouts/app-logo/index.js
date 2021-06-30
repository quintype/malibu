import React from "react";
import { Link } from "@quintype/components";

import "./app-logo.m.css";

import { SvgIconHandler } from "../../atoms/svg-icon-hadler/index";

const AppLogo = () => {
  return (
    <Link href="/">
      <SvgIconHandler type="logo" width="178" height="36" viewBox="0 0 997.64 195.19" />
    </Link>
  );
};

export { AppLogo };
