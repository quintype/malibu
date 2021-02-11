import React, { useEffect, useState } from "react";
import { func, string } from "prop-types";
import { withFacebookLogin, withGoogleLogin } from "@quintype/bridgekeeper-js";
import { connect } from "react-redux";
import get from "lodash/get";

import { FbIcon } from "../../atoms/icons/fb-icon";
import { Google } from "../../atoms/icons/google";
import Button from "../../atoms/Button";

import "./social-login.m.css";

export const SocialLoginBase = ({ checkForMemberUpdated, googleAppId, facebookAppId }) => {
  const [error, setError] = useState("");
  const [currentLocation, setCurrentLocation] = useState("/");

  useEffect(() => {
    const location = window.location.href;
    location && setCurrentLocation(location);
  }, []);

  const socialLogin = (e, login) => {
    e.preventDefault();

    login()
      .then(() => {
        checkForMemberUpdated().then(res => {
          console.log("successfully login");
        });
      })
      .catch(error => {
        console.log("error", error);
        if (error === "NO_EMAIL") {
          setError("The account you are using does not have an email id. Please try with another account.");
        } else if (error === "NOT_LOADED") {
          setError("");
        } else if (error === "NOT_GRANTED") {
          setError("There seems to be an error with social logins. Please do a manual email/password login.");
        } else {
          setError("Oops! Something went wrong. Please try again later.");
        }
      }); // Can also make an API call to /api/v1/members/me
  };

  const googleOnClick = (e, serverSideLoginPath) => {
    window.location.href = serverSideLoginPath;
  };

  const FaceBookLogin = () => {
    const { login, serverSideLoginPath } = withFacebookLogin(facebookAppId, "email", true, currentLocation);
    return (
      <Button color="#3b5998" flat href={serverSideLoginPath} onClick={e => socialLogin(e, login)} socialButton>
        <span styleName="icon">
          <FbIcon color="#3b5998" width={9} height={15} />
        </span>{" "}
        Facebook
      </Button>
    );
  };

  const GoogleLogin = () => {
    const { serverSideLoginPath } = withGoogleLogin(googleAppId, "email", true, currentLocation);
    return (
      <Button
        color="#dd4b39"
        flat
        href={serverSideLoginPath}
        onClick={e => googleOnClick(e, serverSideLoginPath)}
        socialButton
      >
        <span styleName="icon">
          <Google />
        </span>{" "}
        Google
      </Button>
    );
  };

  return (
    <div styleName="social-login">
      <h3 styleName="title">Or login with</h3>
      <ul styleName="buttons">
        <li styleName="button">
          <FaceBookLogin />
        </li>
        <li styleName="button">
          <GoogleLogin />
        </li>
      </ul>
      <p styleName="error">{error}</p>
    </div>
  );
};

SocialLoginBase.propTypes = {
  checkForMemberUpdated: func,
  googleAppId: string,
  facebookAppId: string
};

const mapStateToProps = state => ({
  googleAppId: get(state, ["qt", "config", "publisher-attributes", "google_app_id"], ""),
  facebookAppId: get(state, ["qt", "config", "publisher-attributes", "facebook_app_id"], "")
});

export const SocialLogin = connect(mapStateToProps, null)(SocialLoginBase);
