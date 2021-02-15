import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import { object, bool } from "prop-types";
import { currentUser, logout } from "@quintype/bridgekeeper-js";

import { MEMBER_UPDATED } from "../../store/actions";
import { NavbarSearch } from "../navbar-search";
import { MenuItem } from "../helper-components";
import { AppLogo } from "../app-logo";

import "./styles.m.css";
import { WithMember } from "@quintype/components";

const NavBar = ({ menu, enableLogin }) => {
  const AccountModal = lazy(() => import("../../login/AccountModal"));
  const [showAccountModal, setShowAccountModal] = useState(false);
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const currentUserResp = await currentUser();
      dispatch({ type: MEMBER_UPDATED, member: get(currentUserResp, ["user"], null) });
    } catch (err) {
      console.log("error--------", err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

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
          <WithMember>
            {({ checkForMemberUpdated, isLoading }) =>
              !isLoading && (
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
                            checkForMemberUpdated={checkForMemberUpdated}
                          />
                        </Suspense>
                      )}
                    </>
                  )}
                </li>
              )
            }
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
