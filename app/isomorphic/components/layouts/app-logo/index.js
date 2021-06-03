import React from "react";
import { Link } from "@quintype/components";
import { useSelector } from "react-redux";
import { get } from "lodash";

import "./app-logo.m.css";

const AppLogo = () => {
  const sketchesHost = useSelector(state => get(state, ["qt", "config", "sketches-host"], ""));
  let imageUrl =
    "https://images.assettype.com/malibu/2021-06/797284bf-9a6e-46bd-8dee-79642f02b732/malibu_logo_new.svg?w=200";

  if (sketchesHost.includes("qtstage")) {
    imageUrl = "https://qtstage-01.gumlet.io/malibu/2021-03/193b1a09-89cf-4b07-8d4f-fcf00d534577/malibu_logo_new.svg";
  }

  return (
    <Link href="/">
      <img height="36" width="178" loading="lazy" styleName="publisher-logo" src={imageUrl} alt="Logo" />
    </Link>
  );
};

export { AppLogo };
