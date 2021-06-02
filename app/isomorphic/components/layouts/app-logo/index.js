import React from "react";
import { Link } from "@quintype/components";
import { useSelector } from "react-redux";
import { get } from "lodash";

import "./app-logo.m.css";

const AppLogo = () => {
  const appLogo = useSelector(state =>
    get(state, ["qt", "config", "publisher-settings", "publisher-logo", "url"], null)
  );
  return (
    <Link href="/">
      <img height="36" width="178" loading="lazy" styleName="publisher-logo" src={appLogo} alt="Logo" />
    </Link>
  );
};

export { AppLogo };
