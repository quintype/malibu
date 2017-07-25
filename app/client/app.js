import css from '../../app/assets/stylesheets/app.scss';

global.Promise = global.Promise || require("bluebird");
global.superagent = require('superagent-promise')(require('superagent'), Promise);

import { createStore, navigateToPage } from 'quintype-toddy-libs/store/create-store';
import { renderIsomorphicComponent, renderBreakingNews } from 'quintype-toddy-libs/client/start';
import { NAVIGATE_TO_PAGE } from 'quintype-toddy-libs/store/actions';

import { pickComponent } from '../isomorphic/pick-component';
import { BreakingNewsView } from '../isomorphic/components/breaking-news-view';

import history from './history';

function getRouteData(path, opts) {
  opts = opts || {};
  return superagent.get('/route-data.json', Object.assign({path: path}, opts));
}

function startApp() {
  getRouteData(window.location.pathname, {config: true})
    .then((result) => {
      const store = createStore(null, result.body);
      renderIsomorphicComponent('container', store, pickComponent);
      renderBreakingNews('breaking-news-container', store, BreakingNewsView);
      history.listen(change => maybeNavigateTo(change.pathname, store));
    });
}

function maybeNavigateTo(path, store) {
  if(store.getState().currentPath != path)
    navigateToPage(store.dispatch, path, true);
}

global.navigateToPage = function(dispatch, path, doNotPushPath) {
  getRouteData(path)
    .then((response) => dispatch({
      type: NAVIGATE_TO_PAGE,
      page: response.body,
      currentPath: path
    })).then(() => {
      if(!doNotPushPath)
        history.push(path)
    });
}

startApp();

if(global.navigator.serviceWorker) {
    global.navigator.serviceWorker.register("/service-worker.js");
}
