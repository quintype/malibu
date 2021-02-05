import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import { object, bool } from "prop-types";
import { WithMember } from "@quintype/components";
import { getMember, Logout } from "@quintype/bridgekeeper-js"

import { MEMBER_UPDATED } from "../../store/actions";
import { NavbarSearch } from "../navbar-search";
import { MenuItem } from "../helper-components";
import { AppLogo } from "../app-logo";

import "./styles.m.css";

const NavBar = ({ menu, enableLogin }) => {
  const AccountModal = lazy(() => import("../../login/AccountModal"));
  const [showAccountModal, setShowAccountModal] = useState(false);
  const dispatch = useDispatch();
  useEffect (()=> {
    getMember().then(data => dispatch({ type: MEMBER_UPDATED, member: {
      "id": 1086346,
      "name": "athira",
      "email": "athira+95@quintype.com",
      "created-at": 1612346093145,
      "avatar-url": null,
      "first-name": null,
      "last-name": null,
      "verification-status": "email",
      "metadata": null,
      "avatar-s3-key": null,
      "slug": null,
      "communication-email": null,
      "phone-number": null,
      "updated-at": 1612346112510,
      "is-tfa-enabled": false,
      "username": "athira+95@quintype.com"
      }}) )
  }, [])

  const logoutHandler = () => {
    Logout().then(() => {
      dispatch({
        type: MEMBER_UPDATED,
        member: null
      });
    });
  };

  useSelector(state => console.log("state--------------", state));
  const member = useSelector(state => get(state, ["member"], null));

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
                <button onClick={logoutHandler}>Logut</button>
                <p>{`Username: ${get(member, ["name"], "")}`}</p>
              </>
            ) : (
              <>
                <button onClick={() => setShowAccountModal(true)}>Login</button>
                {showAccountModal && (
                  <Suspense fallback={<div></div>}>
                    <AccountModal
                      onBackdropClick={() => setShowAccountModal(false)}
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
