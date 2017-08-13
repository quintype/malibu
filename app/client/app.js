import css from '../../app/assets/stylesheets/app.scss';

import { createQtStore } from 'quintype-toddy-libs/store/create-store';
import { renderIsomorphicComponent, renderBreakingNews, history, navigateToPage, getRouteData } from 'quintype-toddy-libs/client/start';
import { NAVIGATE_TO_PAGE } from 'quintype-toddy-libs/store/actions';

global.Promise = global.Promise || require("bluebird");
global.superagent = require('superagent-promise')(require('superagent'), Promise);
global.navigateToPage = navigateToPage;

import { pickComponent } from '../isomorphic/pick-component';
import { BreakingNewsView } from '../isomorphic/components/breaking-news-view';

// This is the entry point. Ideally, unused functions will get compiled out
function startApp() {
  getRouteData(window.location.pathname, {config: true})
    .then((result) => {
      const store = createQtStore(null, result.body);
      renderIsomorphicComponent('container', store, pickComponent);
      renderBreakingNews('breaking-news-container', store, BreakingNewsView);
      history.listen(change => maybeNavigateTo(change.pathname, store));
    });
}

function maybeNavigateTo(path, store) {
  if(store.getState().currentPath != path)
    navigateToPage(store.dispatch, path, true);
}

startApp();

if(process.env.NODE_ENV == 'production' && global.navigator.serviceWorker) {
    global.navigator.serviceWorker.register("/service-worker.js");
}
