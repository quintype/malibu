import React from "react";
import { Link } from "@quintype/components";

import "./app-logo.m.css";

const AppLogo = () => (
  <h1 className="logo-wrapper">
    <Link href="/">
      <img
        height="36"
        width="178"
        loading="lazy"
        styleName="publisher-logo"
        srcSet="https://qtstage-01.gumlet.io/malibu/2021-03/193b1a09-89cf-4b07-8d4f-fcf00d534577/malibu_logo_new.svg"
        data-src="https://qtstage-01.gumlet.io/malibu/2021-03/193b1a09-89cf-4b07-8d4f-fcf00d534577/malibu_logo_new.svg"
        alt="Logo"
      />
    </Link>
  </h1>
);

export { AppLogo };
