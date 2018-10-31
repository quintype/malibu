import React from "react";
import get from 'lodash/get';
import { NavbarSearch } from "../navbar-search";
import { SubmenuItem } from '../helper-components';
import { AppLogo } from '../app-logo';
import './styles.m.css';
function NavBar(props) {
  return (
    <React.Fragment>
      <AppLogo />
      <nav styleName="nav-menu">
        <ul styleName="menu-group-header-links">
          {
               get(props,['menu','default'], []).map((item, index)=> {

                return <li key={`${item['id']}${index}`} onClick={props.closeMenu}><SubmenuItem item={item}/></li>
              })
            }
        </ul>
      </nav>
      <NavbarSearch {...props}/>
    </React.Fragment>
  );
}
export { NavBar }
