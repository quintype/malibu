/* eslint-disable global-require */
import { startApp } from "@quintype/framework/client/start";
import { renderApplication } from "./render";
import "../../app/assets/stylesheets/app.scss";

function enableHotReload(store) {
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./render", () => renderApplication(store));
  }
}

const CUSTOM_REDUCERS = {};

// REMOVE ME
global.superagent = require('superagent-promise')(require('superagent'), Promise);

startApp(renderApplication, CUSTOM_REDUCERS, {
  enableServiceWorker: process.env.NODE_ENV === 'production',
  appVersion: require("../isomorphic/app-version"),
}).then(enableHotReload);
