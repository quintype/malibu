/* eslint-disable global-require */
import wretch from "wretch";
import { startApp } from "@quintype/framework/client/start";
import { renderApplication, preRenderApplication } from "./render";
import { REDUCERS } from "../isomorphic/components/store/reducers";

import "../../app/assets/stylesheets/app.scss";

const opts = {
  enableServiceWorker: process.env.NODE_ENV === "production",
  appVersion: require("../isomorphic/app-version"),
  preRenderApplication
};

function enableHotReload(store) {
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./render", () => renderApplication(store));
  }
}

if (window.OneSignal) {
  Object.assign(opts, {
    serviceWorkerLocation: "/OneSignalSDKWorker.js"
  });
}

global.wretch = wretch;

startApp(renderApplication, REDUCERS, opts).then(enableHotReload);
