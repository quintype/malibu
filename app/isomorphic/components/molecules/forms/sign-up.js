import React, { useState } from "react";
import { func } from "prop-types";
import { register } from "@quintype/bridgekeeper-js";

import { InputField } from "../../atoms/InputField";

import "./forms.m.css";

export const SignUp = ({ onSignup, onLogin }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });
  const [errorMsg, setError] = useState("");
  const [ifUserExists, setUserExists] = useState(false);

  // const sendEmail = user => {
  //   const data = {
  //     event: "signup",
  //     mail: user.email,
  //     name: user.name
  //   };
  //   wretch("/send-email").post(data);
  // };

  const signUpHandler = async e => {
    e.preventDefault();
    e.stopPropagation();
    const userObj = {
      name: userInfo.name,
      email: userInfo.email,
      username: userInfo.email,
      password: userInfo.password,
      "dont-login": false
    };

    try {
      const { user, message } = await register(userObj);
      if (!user && message === "User Already exists") {
        return setUserExists(true);
      }
      onSignup(user);
    } catch (err) {
      if (err.status === 409) {
        setError(`The email '${userObj.email}' already exists`);
      } else {
        setError("Oops! Something went wrong");
      }
    }
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
      <InputField name="Email" type="email" id="email" onChange={setData} required />
      <InputField name="Password" type="password" id="password" onChange={setData} required />
      {ifUserExists && (
        <p styleName="error">
          The email ID is already registered. Please <button onClick={() => onSignup(userInfo)}>verify</button> or{" "}
          <button onClick={onLogin}>login</button>.
        </p>
      )}
      {errorMsg && <p styleName="error">{errorMsg}</p>}
      <button aria-label="signup-button" onClick={signUpHandler} className="malibu-btn-large malibu-btn-right">
        Sign up
      </button>
    </form>
  );
};

SignUp.propTypes = {
  onSignup: func,
  setMember: func,
  onLogin: func
};
