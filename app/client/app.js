import css from '../../app/assets/stylesheets/app.scss';

import { createQtStore } from 'quintype-toddy-libs/store/create-store';
import { history, navigateToPage, maybeNavigateTo, getRouteData, app } from 'quintype-toddy-libs/client/start';
import { NAVIGATE_TO_PAGE } from 'quintype-toddy-libs/store/actions';

global.Promise = global.Promise || require("bluebird");
global.superagent = require('superagent-promise')(require('superagent'), Promise);
global.navigateToPage = navigateToPage;

global.app = app || {};

global.app.maybeSetUrl = function maybeSetUrl(path, title) {
  if(global.location.pathname == path)
    return;
  global.history.pushState && global.history.pushState(null, title, path);
  global.window.document.title = title;
}

import { renderApplication } from './render'

// This is the entry point. Ideally, unused functions will get compiled out
function startApp() {
  getRouteData(window.location.pathname, {config: true})
    .then((result) => {
      const store = createQtStore(null, result.body);

      renderApplication(store);
      history.listen(change => maybeNavigateTo(change.pathname, store));

      if(process.env.NODE_ENV == 'development' && module.hot) {
        module.hot.accept('./render', () => renderApplication(store));
      }
    });
}

startApp();

if(process.env.NODE_ENV == 'production' && global.navigator.serviceWorker) {
    global.navigator.serviceWorker.register("/service-worker.js");
}
