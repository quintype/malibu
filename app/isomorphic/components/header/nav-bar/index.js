import React, { useState } from "react";
import get from "lodash/get";
import { func } from "prop-types";

import { NavbarSearch } from "../navbar-search";
import { MenuItem } from "../helper-components";
import { AppLogo } from "../app-logo";
import AccountModal from "../../login/AccountModal";

import "./styles.m.css";

const NavBar = props => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  return (
    <React.Fragment>
      <AppLogo />
      <ul styleName="navbar">
        {get(props, ["menu", "default"], []).map((item, index) => {
          return (
            <li key={`${item.id}${index}`} onClick={props.closeMenu} styleName="menu-item">
              <MenuItem item={item} />
            </li>
          );
        })}
        <li>
          <button onClick={() => setShowAccountModal(true)}>Login</button>
          {showAccountModal && (
            <AccountModal onBackdropClick={() => setShowAccountModal(false)} checkForMemberUpdated={{}} />
          )}
          {/* checkForMemberUpdated from
          withmember of qt components library and also add onBackdropClick which is used for closing popup */}
        </li>
      </ul>
      <NavbarSearch {...props} />
    </React.Fragment>
  );
};

NavBar.propTypes = {
  closeMenu: func
};

export { NavBar };
