import React from "react";
import {SocialIcons} from  '../social-icons.js';
import {format} from 'date-fns';
import {Logo} from "./logo.js";
import {NavMenu} from "./nav-menu.js";
import "./header.m.css";

function TopHeader({TopHeaderMenu}){
	return (
		<div styleName="TopHeader">
			<div styleName="Container TopHeaderContainer">
				<time styleName="Date"> {format(new Date(), 'ddd MMM DD YYYY') }</time>
			  <ul styleName="Menu">
			     { TopHeaderMenu.externalLinks.map((item) =>
			      <li key={item.heading} styleName="MenuItem"><a styleName="MenuLink"  href={item.url}>{item.heading}</a></li>
			     )}
			  </ul>
			  <SocialIcons icons={TopHeaderMenu}/>
			</div>
		</div>
	);
}

function Header(props) {
	return (
		<div className="Header">
			<TopHeader TopHeaderMenu={props.menu} />
			<Logo LogoUrl={props.logo} />
			<NavMenu MenuList={props.NavMenu} />
		</div>
	);
}
export{ Header }
