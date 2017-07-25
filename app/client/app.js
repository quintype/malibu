import css from '../../app/assets/stylesheets/app.scss';

global.Promise = global.Promise || require("bluebird");
global.superagent = require('superagent-promise')(require('superagent'), Promise);

import React from 'react';
import { IsomorphicComponent } from '../isomorphic/component';
import { BreakingNews } from '../isomorphic/components/breaking-news';
import { NAVIGATE_TO_PAGE, BREAKING_NEWS_UPDATED } from '../isomorphic/actions';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import history from './history';

function reducer(state, action) {
  switch (action.type) {
    case NAVIGATE_TO_PAGE: return Object.assign({}, state, action.page, {currentPath: action.currentPath});
    case BREAKING_NEWS_UPDATED: return Object.assign({}, state, {breakingNews: action.stories});
    default: return state;
  }
}

function getRouteData(path, opts) {
  opts = opts || {};
  return superagent.get('/route-data.json', Object.assign({path: path}, opts));
}

function renderComponent(clazz, container, store) {
  return ReactDOM.render(
    React.createElement(Provider, {store: store},
      React.createElement(clazz)),
    document.getElementById(container));
}

function startApp() {
  getRouteData(window.location.pathname, {config: true})
    .then((result) => {
      const store = createStore(reducer, Object.assign({currentPath: window.location.pathname}, result.body));
      renderComponent(IsomorphicComponent, 'container', store);
      renderComponent(BreakingNews, 'breaking-news-container', store);
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
