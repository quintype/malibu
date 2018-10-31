import React from "react";
import { Link } from "@quintype/components";
import assetify from '@quintype/framework/assetify';

import './styles.m.css';

import logo from './mailbu-logo.jpg';

function AppLogo(props) {
  return <div>
    <Link href="/">
      <img styleName = "publisher-logo" srcSet={` ${assetify(logo)}`} src={assetify(logo)} alt="mailbu" />
    </Link>
  </div>
}

export { AppLogo };
