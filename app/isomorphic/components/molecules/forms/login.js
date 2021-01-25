import React, { useState } from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import { func, bool } from "prop-types";
import { SocialLogin } from "../SocialLogin";
import { InputField } from "../../atoms/InputField";
// import { IS_OPEN_LOGIN_FORM } from "../../helper/actions";

import "./forms.m.css";

const LoginBase = ({ onLogin, checkForMemberUpdated, forgotPassword, manageLoginForm }) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({});

  const setData = e => {
    const userObj = { ...user };
    const fieldName = e.target.id;
    userObj[fieldName] = e.target.value;
    setUser(userObj);
  };

  const loginHandler = async e => {
    e.preventDefault();
    e.stopPropagation();
    // const userObj = {
    //   username: user.email,
    //   email: user.email,
    //   password: user.password
    // };

    if (user.email.length < 1 || user.password.length < 1) {
      setError({ message: "Please provide username and password" });
      return null;
    }

    console.log("need to implement logic flow through BK library");

    // login(userObj)
    //   .then(({ user }) => {
    //     assignUserIdToLogger(user.id);
    //     if (user["verification-status"]) {
    //       // User email is verified
    //       return checkForMemberUpdated().then(() => {
    //         manageLoginForm(false);
    //         console.log("loged in successfully");
    //       });
    //     } else {
    //       // User needs to validate the email account so send out an email to verify
    //       return verifyEmail(user.email)
    //         .then(res => onLogin(user, res))
    //         .catch(error => setError(error));
    //     }
    //   })
    //   .catch(error => setError(error));
  };

  return (
    <React.Fragment>
      <form styleName="malibu-form" onSubmit={loginHandler}>
        <InputField name="Email" id="email" type="email" required onChange={setData} />
        <InputField name="Password" id="password" type="password" required onChange={setData} />
        {error && <p styleName="error">{error.message}</p>}
        <div styleName="actions">
          <div styleName="malibu-link" onClick={forgotPassword}>
            Forgot Password?
          </div>
          <button aria-label="login-button" onClick={loginHandler} className="malibu-btn-large">
            Login
          </button>
        </div>
      </form>
      <SocialLogin checkForMemberUpdated={checkForMemberUpdated} />
    </React.Fragment>
  );
};

LoginBase.propTypes = {
  checkForMemberUpdated: func,
  onLogin: func,
  forgotPassword: func,
  manageLoginForm: func,
  isLoginOpen: bool
};

const mapStateToProps = state => ({
  isLoginOpen: get(state, ["isLoginOpen"], false)
});

const mapDispatchToProps = dispatch => ({
  manageLoginForm: function(payload) {
    dispatch({
      // type: IS_OPEN_LOGIN_FORM,
      payload: payload
    });
  }
});

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginBase);
