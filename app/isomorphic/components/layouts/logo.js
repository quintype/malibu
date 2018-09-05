import React from "react";
import "./logo.m.css";

function Logo({LogoUrl}) {
  return (
    <div styleName="Logo">
      <div className="container" styleName="LogoHeader ">
        <div><i class="fa fa-bars"></i></div>
        <div>logo</div>
        <div>search</div>
      </div>
    </div>
  );
}
export {Logo}
