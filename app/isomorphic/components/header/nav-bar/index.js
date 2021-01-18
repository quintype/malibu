import React, { useState, lazy, Suspense } from "react";
import get from "lodash/get";
import { object, bool } from "prop-types";
import { WithMember } from "@quintype/components";

import { NavbarSearch } from "../navbar-search";
import { MenuItem } from "../helper-components";
import { AppLogo } from "../app-logo";

import "./styles.m.css";

const NavBar = ({ menu, enableLogin }) => {
  const AccountModal = lazy(() => import("../../login/AccountModal"));
  const [showAccountModal, setShowAccountModal] = useState(false);
  return (
    <React.Fragment>
      <AppLogo />
      <ul styleName="navbar">
        {get(menu, ["default"], []).map((item, index) => {
          return (
            <li key={`${item.id}${index}`} styleName="menu-item desktop-view">
              <MenuItem item={item} />
            </li>
          );
        })}
        {enableLogin && (
          <WithMember>
            {({ member, logout, checkForMemberUpdated, isLoading }) => (
              <li>
                <button onClick={() => setShowAccountModal(true)}>Login</button>
                {showAccountModal && (
                  <Suspense fallback={<div></div>}>
                    <AccountModal
                      onBackdropClick={() => setShowAccountModal(false)}
                      checkForMemberUpdated={checkForMemberUpdated}
                    />
                  </Suspense>
                )}
                {/* checkForMemberUpdated from
          withmember of qt components library and also add onBackdropClick which is used for closing popup */}
              </li>
            )}
          </WithMember>
        )}
      </ul>
      <NavbarSearch />
    </React.Fragment>
  );
};

NavBar.propTypes = {
  menu: object,
  enableLogin: bool
};

export { NavBar };
