import React, { useState, lazy, Suspense, useEffect } from "react";
import get from "lodash/get";
import { object, bool } from "prop-types";
import { Logout, getMember } from "@quintype/bridgekeeper-js";

import { NavbarSearch } from "../navbar-search";
import { MenuItem } from "../helper-components";
import { AppLogo } from "../app-logo";

import "./styles.m.css";

const NavBar = ({ menu, enableLogin }) => {
  const AccountModal = lazy(() => import("../../login/AccountModal"));
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [member, setMember] = useState(null);

  useEffect(() => {
    const member = getMember().then(data => data.user);
    setMember(member);
  });
  const logoutHandler = () => {
    Logout().then(() => {
      setMember(null);
    });
  };

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
          <li>
            {member ? (
              <>
                <button onClick={logoutHandler}>Logout</button>
                <p>{`Username: ${get(member, ["name"], "")}`}</p>
              </>
            ) : (
              <>
                <button onClick={() => setShowAccountModal(true)}>Login</button>
                {showAccountModal && (
                  <Suspense fallback={<div></div>}>
                    <AccountModal
                      onBackdropClick={() => setShowAccountModal(false)}
                      checkForMemberUpdated={getMember}
                    />
                  </Suspense>
                )}
              </>
            )}
          </li>
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
