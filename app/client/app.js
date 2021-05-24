/* eslint-disable global-require */
import { startApp } from "@quintype/framework/client/start";
import wretch from "wretch";

import { renderApplication, preRenderApplication } from "./render";
import "../../app/assets/stylesheets/app.scss";
import { REDUCERS } from "../isomorphic/components/store/reducers";

const opts = {
  enableServiceWorker: process.env.NODE_ENV === "production",
  appVersion: require("../isomorphic/app-version"),
  preRenderApplication
};

function enableHotReload(store) {
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./render", () => {
      renderApplication(store);
      preRenderApplication(store);
    });
  }
}

const CUSTOM_REDUCERS = REDUCERS;

global.wretch = wretch;

startApp(renderApplication, CUSTOM_REDUCERS, opts).then(enableHotReload);
