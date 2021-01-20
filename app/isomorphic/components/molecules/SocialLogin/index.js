// import React, { useState } from "react";
import React from "react";
import PT from "prop-types";
// import get from "lodash/get";
// import { WithFacebookLogin, WithGoogleLogin /* WithTwitterLogin */ } from "@quintype/components";
// import { Button } from "../../atoms/button";
import { FbIcon } from "../../atoms/icons/fb-icon";
// import { TwitterIcon } from "../../atoms/icons/twitter-icon";
import { Google } from "../../atoms/icons/google";
// import IntegrationData from "../../../../../config/integrations.js";
import "./social-login.m.css";

export const SocialLogin = ({ checkForMemberUpdated }) => {
  // const [error, setError] = useState("");
  // const { appKeys } = IntegrationData();
  // const facebookKey = get(appKeys, ["facebookAppkey"], "");
  // const googleClientId = get(appKeys, ["googleClientId"], "");
  // const twitterKey = get(appKeys, ["twitterAppkey"], "");

  // const socialLogin = (e, login) => {
  //   e.preventDefault();

  //   login()
  //     .then(() => {
  //       checkForMemberUpdated();
  //       checkForMemberUpdated().then(res => {
  //         console.log("successfully login");
  //       });
  //     })
  //     .catch(error => {
  //       console.log("error", error);
  //       if (error === "NO_EMAIL") {
  //         setError("The account you are using does not have an email id. Please try with another account.");
  //       } else if (error === "NOT_LOADED") {
  //         setError("");
  //       } else if (error === "NOT_GRANTED") {
  //         setError("There seems to be an error with social logins. Please do a manual email/password login.");
  //       } else {
  //         setError("Oops! Something went wrong. Please try again later.");
  //       }
  //     }); // Can also make an API call to /api/v1/members/me
  // };

  // const googleOnClick = (e, serverSideLoginPath) => {
  //   window.location.href = serverSideLoginPath;
  // };

  return (
    <div styleName="social-login">
      <h3 styleName="title">Or login with</h3>
      <ul styleName="buttons">
        <li styleName="button">
          {/* <WithFacebookLogin appId={facebookKey} scope="email" emailMandatory>
          {({ login, serverSideLoginPath }) => (
            <Button color="#3b5998" flat href={serverSideLoginPath} onClick={e => socialLogin(e, login)} socialButton> */}
          <span styleName="icon">
            <FbIcon color="#3b5998" width={9} height={15} />
          </span>{" "}
          Facebook
          {/* </Button>
          )}
        </WithFacebookLogin> */}
        </li>
        <li styleName="button">
          {/* <WithGoogleLogin clientId={googleClientId} scope="email" emailMandatory isBridgekeeperLogin={true}>
          {({ login, serverSideLoginPath }) => (
            <Button
              color="#dd4b39"
              flat
              href={serverSideLoginPath}
              onClick={e => googleOnClick(e, serverSideLoginPath)}
              socialButton
            > */}
          <span styleName="icon">
            <Google />
          </span>{" "}
          Google
          {/* </Button>
          )}
        </WithGoogleLogin> */}
        </li>
        {/* <li styleName="button">
        <WithTwitterLogin apiKey={twitterKey} emailMandatory>
          {({ login, serverSideLoginPath }) => (
            <Button color="#1da1f2" flat href={serverSideLoginPath} onClick={e => socialLogin(e, login)} socialButton>
              <span styleName="icon">
                <TwitterIcon color="#1da1f2" width={16} height={12} />
              </span>{" "}
              Twitter
            </Button>
          )}
        </WithTwitterLogin>
      </li> */}
      </ul>
      {/* <p styleName="error">{error}</p> */}
    </div>
  );
};

SocialLogin.propTypes = {
  checkForMemberUpdated: PT.func
};
