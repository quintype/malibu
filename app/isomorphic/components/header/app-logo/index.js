import React from "react";
import { Link } from "@quintype/components";
// import assetify from "@quintype/framework/assetify";

import "./app-logo.m.css";

// import logo from "../../../../assets/images/malibu-logo.jpg";

const AppLogo = () => (
  <h1>
    <Link href="/">
      <img
        height="60"
        width="226"
        loading="lazy"
        styleName="publisher-logo"
        srcSet="https://qtstage-01.gumlet.io/malibu/2021-02/22dbd380-a2f2-4910-a016-0ae8a8bf7081/malibu_logo.jpg?auto=format%2Ccompress&format=webp&w=100&dpr=2.0"
        src="https://qtstage-01.gumlet.io/malibu/2021-02/22dbd380-a2f2-4910-a016-0ae8a8bf7081/malibu_logo.jpg?auto=format%2Ccompress&format=webp&w=100&dpr=2.0"
        alt="Logo"
      />
    </Link>
  </h1>
);

export { AppLogo };
