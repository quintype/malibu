import React, { useState } from "react";
import { func } from "prop-types";

import { sendOtp } from "@quintype/bridgekeeper-js";

import { Modal } from "../Modal";
import { Login } from "../../molecules/forms/login";
import { SignUp } from "../../molecules/forms/sign-up";
import { OTP } from "../../molecules/forms/otp";
import { ForgotPassword } from "../../molecules/forms/forgot-password";

import "./account-modal.m.css";

const AccountModal = ({ onBackdropClick, checkForMemberUpdated }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [member, setMember] = useState(null);
  const [otpToken, setOtpToken] = useState(null);

  const otpHandler = (member, otpDetails) => {
    setMember(member);
    setOtpToken(otpDetails["email-token"]);
    setActiveTab("otp");
  };

  const onSuccess = async member => {
    try {
      const otpDetails = await sendOtp(member.email);
      otpHandler(member, otpDetails);
    } catch (err) {
      console.log(err);
    }
  };

  const getScreen = () => {
    switch (activeTab) {
      case "login":
        return (
          <Login
            onLogin={(member, res) => otpHandler(member, res)}
            checkForMemberUpdated={checkForMemberUpdated}
            forgotPassword={() => setActiveTab("forgot-password")}
          />
        );
      case "register":
        return (
          <SignUp
            onSignup={member => onSuccess(member)}
            onLogin={() => {
              setActiveTab("login");
            }}
          />
        );
      case "otp":
        return <OTP id={otpToken} member={member} />;
      case "forgot-password":
        return <ForgotPassword onBackdropClick={onBackdropClick} />;
      default:
        return null;
    }
  };

  const getActiveTabHeading = () => {
    if (activeTab === "forgot-password")
      return (
        <ul styleName="tabs">
          <li styleName={`tab-item active`}>Forgot Password</li>
        </ul>
      );

    return (
      <ul styleName="tabs">
        <li onClick={() => setActiveTab("login")} styleName={`tab-item ${activeTab === "login" ? "active" : ""}`}>
          Login
        </li>
        <li onClick={() => setActiveTab("register")} styleName={`tab-item ${activeTab === "register" ? "active" : ""}`}>
          Register
        </li>
      </ul>
    );
  };

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <div styleName="account-modal">
        <div styleName="form-wrapper">
          {getActiveTabHeading()}
          <div className="forms">{getScreen()}</div>
        </div>
      </div>
    </Modal>
  );
};

AccountModal.propTypes = {
  onBackdropClick: func,
  checkForMemberUpdated: func
};

export default AccountModal;
