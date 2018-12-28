/* eslint-disable global-require */
import { startApp } from "@quintype/framework/client/start";
import { renderApplication, preRenderApplication } from "./render";
import "../../app/assets/stylesheets/app.scss";
import wretch from "wretch";

function enableHotReload(store) {
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./render", () => renderApplication(store));
  }
}

const CUSTOM_REDUCERS = {};

global.wretch = wretch;

startApp(renderApplication, CUSTOM_REDUCERS, {
  enableServiceWorker: process.env.NODE_ENV === "production",
  appVersion: require("../isomorphic/app-version"),
  preRenderApplication
}).then(enableHotReload);
