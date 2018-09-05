import React from "react";
import "./nav-menu.m.css";

function NavMenu ({MenuList}) {
  return(
    <div styleName="MenuHeader">
      <div className="container" styleName="NavMenu">
        <div styleName="IconHome"><i class="fa fa-home" /></div>
          <MenuItem MenuList= { MenuList} />
        <div styleName="IconSearch"><i class="fa fa-search"></i></div>
      </div>
    </div>
  );

}
 export {NavMenu}

function MenuItem({ MenuList}) {
  return(
    <ul styleName="TopNavMenu">
    {
      MenuList.map(item =>
        <li styleName="NavMenuItem" key={item.name}><a styleName="NavMenuLink" href={item.url}>{item.name}</a>
          <ul styleName="DropdownContent">
           { item.children && item.children.map(DropDown =>
              <li key={DropDown.name} styleName="DropdownItem"><a styleName="DropdownLink" href={DropDown.url}>{DropDown.name}</a> </li>
            )}
          </ul>
        </li>
    )}
    </ul>
  );
}


