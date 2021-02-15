import React, { useState } from "react";
import PT from "prop-types";
import wretch from "wretch";

import { InputField } from "../../atoms/InputField";

import "./forms.m.css";

export const SignUp = ({ onSignup }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });
  const [errorMsg, setError] = useState("");

  // const sendEmail = user => {
  //   const data = {
  //     event: "signup",
  //     mail: user.email,
  //     name: user.name
  //   };
  //   wretch("/send-email").post(data);
  // };

  function register(body) {
    return wretch()
      .options({ credentials: "same-origin" })
      .url("/api/auth/v1/signup")
      .post(body)
      .json(res => Promise.resolve(res))
      .catch(ex => Promise.reject(ex));
  }

  const signUpHandler = async e => {
    e.preventDefault();
    e.stopPropagation();
    console.log("## inside signUpHandler");
    const userObj = {
      name: userInfo.name,
      email: userInfo.email,
      username: userInfo.email,
      password: userInfo.password,
      "dont-login": false
    };

    console.log("## userObj=", userObj);

    return register(userObj)
      .then(({ user }) => {
        console.log("## user", user);
        onSignup(user);
        // sendEmail(user);
      })
      .catch(err => {
        console.log("## error", err);
        if (err.status === 409) {
          setError(`The email '${userObj.email}' already exists`);
        } else {
          setError("Oops! Something went wrong");
        }
      });
  };

  const setData = e => {
    const userObj = { ...userInfo };
    const fieldName = e.target.id;
    userObj[fieldName] = e.target.value;
    setUserInfo(userObj);
  };

  return (
    <form styleName="malibu-form" onSubmit={signUpHandler}>
      <InputField name="Name" id="name" required onChange={setData} />
      {/* <InputField
        name="Mobile Number"
        type="tel"
        id="mobile"
        maxLength="10"
        pattern="^\d{10}$"
        onChange={setData}
        required
      /> */}
      <InputField name="Email" type="email" id="email" onChange={setData} required />
      <InputField name="Password" type="password" id="password" onChange={setData} required />
      {errorMsg && <p styleName="error">{errorMsg}</p>}
      <button aria-label="signup-button" onClick={signUpHandler} className="malibu-btn-large malibu-btn-right">
        Sign up
      </button>
    </form>
  );
};

SignUp.propTypes = {
  onSignup: PT.func,
  setMember: PT.func
};
