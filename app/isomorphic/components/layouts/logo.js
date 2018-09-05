import React from "react";
import "./logo.m.css";

function Logo({LogoUrl}) {
  return (
    <div styleName="Logo">
      <div  styleName="Container LogoHeader ">
        <div styleName="MenuController"><i  class="fa fa-bars"></i></div>
        <div><a href="#"><img styleName="LogoImg" src={LogoUrl.url} alt="logo" /></a></div>
        <div styleName="IconSearch"><i class="fa fa-search"></i></div>
      </div>
    </div>
  );
}
export {Logo}
