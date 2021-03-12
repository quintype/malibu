import React from "react";
import { Link } from "@quintype/components";
// import assetify from "@quintype/framework/assetify";

import "./app-logo.m.css";

// import logo from "../../../../assets/images/malibu-logo.jpg";

const AppLogo = () => (
  <h1>
    <Link href="/">
      <img
        height="66"
        width="178"
        loading="lazy"
        styleName="publisher-logo"
        srcSet="https://qtstage-01.gumlet.io/malibu/2021-03/c49bd5b9-d324-402a-a658-cc18f6380b05/malibu_full_logo.svg?w=178"
        data-src="https://qtstage-01.gumlet.io/malibu/2021-03/c49bd5b9-d324-402a-a658-cc18f6380b05/malibu_full_logo.svg"
        alt="Logo"
      />
    </Link>
  </h1>
);

export { AppLogo };
