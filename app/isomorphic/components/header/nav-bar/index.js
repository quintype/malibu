import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import { object, bool } from "prop-types";
import { WithMember } from "@quintype/components";
import { getMember, logout } from "@quintype/bridgekeeper-js"

import { MEMBER_UPDATED } from "../../store/actions";
import { NavbarSearch } from "../navbar-search";
import { MenuItem } from "../helper-components";
import { AppLogo } from "../app-logo";

import "./styles.m.css";

const NavBar = ({ menu, enableLogin }) => {
  const AccountModal = lazy(() => import("../../login/AccountModal"));
  const [showAccountModal, setShowAccountModal] = useState(false);
  const dispatch = useDispatch();
  useEffect (async ()=> {
    const member = await getMember();
    dispatch({ type: MEMBER_UPDATED, member: member.user});
  }, [])

  const logoutHandler = () => {
    logout().then(() => {
      dispatch({
        type: MEMBER_UPDATED,
        member: null
      });
    });
  };

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
