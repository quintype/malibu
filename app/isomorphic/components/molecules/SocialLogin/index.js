import React, { useState } from "react";
import { func } from "prop-types";
import { withFacebookLogin, withGoogleLogin } from "@quintype/bridgekeeper-js";

import { FbIcon } from "../../atoms/icons/fb-icon";
import { Google } from "../../atoms/icons/google";
import Button from "../../atoms/Button";

import "./social-login.m.css";

export const SocialLogin = ({ checkForMemberUpdated }) => {
  const [error, setError] = useState("");

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
    const { login, serverSideLoginPath } = withFacebookLogin(
      "248865019954260",
      "email",
      true,
      "https://malibu-web.qtstage.io/technology/automobiles/lamborghini-the-ferrari-killer"
    );
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
    const { serverSideLoginPath } = withGoogleLogin(
      "163120650123-m2rj93thcgkfs7js80cop6frppemfo1c.apps.googleusercontent.com",
      "email",
      true,
      "https://malibu-web.qtstage.io/technology/automobiles/lamborghini-the-ferrari-killer"
    );
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

SocialLogin.propTypes = {
  checkForMemberUpdated: func
};
