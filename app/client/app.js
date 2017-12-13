import { startApp } from "@quintype/framework/client/start";
import { renderApplication } from "./render";
import "../../app/assets/stylesheets/app.scss";

function enableHotReload(store) {
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./render", () => renderApplication(store));
  }
}

const CUSTOM_REDUCERS = {};

startApp(renderApplication, CUSTOM_REDUCERS, {
  enableServiceWorker: process.env.NODE_ENV === "production"
}).then(enableHotReload);
