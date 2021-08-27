---
title: Single Sign-On using OAuth 2.0
nav_order: 28
parent: Malibu Tutorial
---

# {{page.title}}

*This tutorial was contributed by [Athira M Raju](https://www.linkedin.com/in/athira-m-r-835ab6105)*

Single sign-on (SSO) is an authentication method that enables users to securely authenticate with multiple applications and websites by using just one set of credentials. In this tutorial, we will explain how to set up SSO (Single Sign-On) using Bridgekeeper(Quintype’s authentication service).

As you clone the Malibu Advanced repository, you will be getting this feature out of the box. All you have to do to add the corresponding keys in the configuration file in [BlackKnight](https://black-knight.quintype.com/ "BlackKnight"). If you intend to integrate SSO to your existing app or if you have cloned from Malibu, please follow the below steps.

**Prerequisites:**

- A realm for the publisher’s frontend website should already exist in Bridgekeeper.
- If the client application is not served through Quintype CMS the client application domain needs to be whitelisted in Quintype infra.
- Add the client domain that needs to support Single Sign-On to domains and whitelisted domains for that realm in Bridgekeeper DB.
- Have a common authentication page where the user will be directed to for login. Set the `authentication_url` for that realm in Bridgekeeper to the URL of this authentication page.
- Create a new integration for that realm if not previously existing, and add `https://<CLIENT_DOMAIN>/api/auth/v1/oauth/token` to the list of `redirect_uris` for that realm. This redirect URI and ID of the integration should be provided to the client to make the API calls below


### Login workflow

Before beginning the SSO flow, the client application can determine if a user is already logged in on the client domain by making a GET request to Bridgekeeper on `/api/auth/v1/users/me` or use `[currentUser()](https://developers.quintype.com/bridgekeeper-js/global.html#currentUser "currentUser()")` function from `@quintype/bridgekeeper-js` library, which will return a 200 OK with user details if the user is already logged in, and 401 Unauthorized otherwise.

![Malibu Running]({{"images/sso-auth-flow.png" | absolute_url}})

1. When the user clicks on login on the client domain, the client application should make a GET request to Bridgekeeper on `/api/auth/v1/oauth/authorize` with query params as follows:

```
client_id=INTEGRATION_ID
redirect_uri=CONFIGURED_REDIRECT_URI
callback_uri=ORIGINAL_PAGE_TO_REDIRECT_USER
response_type=code
```

Example :


```javascript
const publisherAttributes =  useSelector(state => get(state, ["qt", "config", "publisher-attributes"], {}));
 const clientId = get(publisherAttributes, ["sso_login", "client_id"], "");
  const redirectUrl = domainSlug
    ? get(publisherAttributes, ["sso_login", "subdomain", domainSlug, "redirect_Url"], "")
    : get(publisherAttributes, ["sso_login", "redirect_Url"], "");

```
```
<a href="/api/auth/v1/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&callback_uri=${window.location.href}&response_type=code`">

```
**Note : ** We are keeping `clientId, redirectUrl and the default callbackUrl` in [BlackKnight](https://black-knight.quintype.com/ "BlackKnight"). The `redirect_uri` will be differnt for differnt domains. Go to [BlackKnight](https://black-knight.quintype.com/ "BlackKnight") `/app/config/publisher.yml`, add `sso_login: <value>` under publisher. Example :

```
...
...
publisher:
  ...
  sso_login:
    is_enable: true
    redirect_Url: "<CLIENT_DOMAIN>>/api/auth/v1/oauth/token" // Need to configure with Bridgekeeper DB
    callback_Url: "<PAGE_TO_REDIRECT_USER>" 
    client_id :  "<INTEGRATION_ID>"  // Id of the integration linked to the realm to be authorized for
    subdomain:
      voices:
        redirect_Url: "<SUB_DOMAIN>/api/auth/v1/oauth/token" // Need to configure with Bridgekeeper DB
        callback_Url: "<PAGE_TO_REDIRECT_USER>"
```

2. If the user is not logged in on the `auth domain`, this will redirect the user to the configured `authentication URL`, where the user can log in (if the user is already logged in on the auth domain, it will redirect to the `redirect_uri` with the auth code as explained in step 5).

3. The authentication domain application can call `api/auth/v1/login` or  call `login()` function from `@quintype/bridgekeeper-js` library to login the user using username/password credentials or social login provider.

4. After logging in, the authentication domain application should call `GET /api/auth/v1/oauth/authorize` or `oauthAuthorize()` call from `@quintype/bridgekeeper-js` library  as before with  `allow_ajax=true`
**Note :**  You can make the request as an AJAX request using an additional parameter of `allow_ajax=true`. Bridgekeeper will then return a `200` response with the `redirect_url` in the body.

Example: 

```
<button aria-label="login-button" onClick={loginHandler} className="malibu-btn-large">
    Login
</button>
```

```
import { parseUrl } from "query-string";
import { getCurrentUser, login } from "@quintype/bridgekeeper-js";
...
...
const currentPath = get(qtConfig, ["currentPath"], "");
const clientId = get(publisherAttributes, ["sso_login", "client_id"], "");
...
...
const loginHandler = async e => {
    e.preventDefault();
    e.stopPropagation();
    const userObj = {
      username: user.email,
      email: user.email,
      password: user.password
    };

    if (user.email.length < 1 || user.password.length < 1) {
      setError({ message: "Please provide username and password" });
      return null;
    }

    login(userObj)
      .then(async ({ user, message }) => {
        if (!user) {
          setError({ message });
          return;
        }
        if (user["verification-status"]) {
          // User email is verified
          await getCurrentUser();
          console.log("loged in successfully");
          const params = parseUrl(currentPath);
          const callbackUrl = get(params, ["query", "callback_uri"]) || get(publisherAttributes, ["sso_login", "callback_Url"], "");
          const redirectUrl = get(params, ["query", "redirect_uri"]) || get(publisherAttributes, ["sso_login", "redirect_Url"], "");
          const allowAjax = true;
          const oauthResponse =
            ssoLoginIsEnable && (await oauthAuthorize(clientId, redirectUrl, callbackUrl, allowAjax));
          if (oauthResponse.redirect_uri) window.location.href = oauthResponse.redirect_uri;
        } else {
          // User needs to validate the email account so send out an email to verify
          return sendOtp(user.email)
            .then(res => onLogin(user, res))
            .catch(error => setError(error));
        }
      })
      .catch(error => console.log("error msg", error.message));
  };

```
5. Now the auth domain will redirect the user to this returned redirect URL (which will be the redirect_uri parameter in step 1 along with authorization code and callback uri query params). This GET `/api/auth/v1/oauth/token` route is handled by Bridgekeeper.

6. Bridgekeeper will convert the authorization code into a `qt-auth` token and then redirect the user to the callback URI (the callback_uri parameter in step 1) on the client application domain with the `qt-auth` token set as the `session cookie`.

![Malibu Running]({{"images/sso-login.gif" | absolute_url}})


To logout a user, the application can make a GET request on `/api/auth/v1/logout` or call `logout` function from` @quintype/bridgekeeper-js`. As a result, the user will be logged out on all domains. An application can determine if the user is logged in or has logged out as before, by making a GET request to Bridgekeeper on `/api/auth/v1/users/me` or `getCurrentUser()` from `@quintype/bridgekeeper-js` library. 


### Social Login
For social login we can use `withFacebookLogin, withGoogleLogin, withAppleLogin` from `@quintype/bridgekeeper-js` library. We need to pass `redirectUrl`  as `https://<auth-domain>/api/auth/v1/oauth/authorize?client_id=<integration-id>&response_type=code&redirect_uri=<redirect-url>&callback_uri=<callback-url>` 

Example: 

```
import { withGoogleLogin } from "@quintype/bridgekeeper-js";
import { parseUrl } from "query-string";
import { connect, useSelector } from "react-redux";

const [redirectUrl, setRedirectUrl] = useState("/");
const publisherAttributes = useSelector(state => get(state, ["qt", "config", "publisher-attributes"], {}));
const currentPath = useSelector(state => get(state, ["qt", "currentPath"], ""));
const clientId = get(publisherAttributes, ["sso_login", "client_id"], "");
...
...

useEffect(() => {
  const params = parseUrl(currentPath);
  const getCallbackUrl = get(params, ["query", "callback_uri"], global.location && global.location.origin);
  const getRedirectUrl =
    get(params, ["query", "redirect_uri"]) || get(publisherAttributes, ["sso_login", "redirect_Url"], "");
  const location = new URL(window.location.href);
  const oauthAuthorize = `${location.origin}/api/auth/v1/oauth/authorize?redirect_uri=${getRedirectUrl}&client_id=${clientId}&callback_uri=${getCallbackUrl}&response_type=code`;
  setRedirectUrl(oauthAuthorize);
}, []);

const GoogleLogin = () => {
  const { serverSideLoginPath } = withGoogleLogin({
    scope: "email",
    emailMandatory: true,
    redirectUrl: encodeURIComponent(redirectUrl)
  });
  return (
    <Button color="#dd4b39" flat href={serverSideLoginPath} socialButton>
      <span styleName="icon">
        <SvgIconHandler type="google" width="13" height="13" viewBox="0 0 13 13" />
      </span>{" "}
      Google
    </Button>
  );
};

<ul styleName="buttons">
...
...
  <li styleName="button">
    <GoogleLogin />
  </li>
....
...
</ul>
```
