import React, { useState } from "react";
import PT from "prop-types";
import get from "lodash/get";
import { connect, useDispatch } from "react-redux";
import { sendOtp, updateWithOtp, currentUser } from "@quintype/bridgekeeper-js";

import { InputField } from "../../atoms/InputField";
import { MEMBER_UPDATED } from "../../store/actions";

import "./forms.m.css";

const OTPBase = ({ member, manageLoginForm }) => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const currentUserResp = await currentUser();
      dispatch({ type: MEMBER_UPDATED, member: get(currentUserResp, ["user"], null) });
    } catch (err) {
      console.log("error--------", err);
    }
  };

  const otpHandler = async e => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await updateWithOtp(otp);
      await getCurrentUser();
      manageLoginForm(false);
      console.log("successfully login");
    } catch (err) {
      setError(true);
      console.warn("error", error);
    }
  };

  const setData = e => {
    setOTP(e.target.value);
  };

  const resendOTP = async () => {
    try {
      await sendOtp(member.email);
      setSuccessMsg("OTP Sent to your registered email");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <React.Fragment>
      <p styleName="otp-text">
        A One Time Password code was sent via email to <span>{member.email}</span>
      </p>
      <form styleName="malibu-form" onSubmit={otpHandler}>
        <InputField name="Enter OTP" id="otp" type="text" required onChange={setData} />
        {error && <p styleName="error">Invalid OTP</p>}
        {successMsg && <p>{successMsg}</p>}
        <div styleName="actions">
          <button aria-label="verify-otp-button" onClick={otpHandler} className="malibu-btn-large">
            Verify OTP
          </button>
          <p styleName="resend-otp" onClick={resendOTP}>
            Resend OTP
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};

OTPBase.propTypes = {
  onSubmit: PT.func,
  member: PT.object,
  checkForMemberUpdated: PT.func,
  manageLoginForm: PT.func,
  isLoginOpen: PT.bool
};

function mapStateToProps(state) {
  return {
    isLoginOpen: get(state, ["isLoginOpen"], false)
  };
}

const mapDispatchToProps = dispatch => ({
  manageLoginForm: function(payload) {
    dispatch({
      // type: IS_OPEN_LOGIN_FORM,
      payload: payload
    });
  }
});

const OTP = connect(mapStateToProps, mapDispatchToProps)(OTPBase);
export { OTP };
