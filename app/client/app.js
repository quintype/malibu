import css from '../../app/assets/stylesheets/app.scss';

global.Promise = global.Promise || require("bluebird");
global.superagent = require('superagent-promise')(require('superagent'), Promise);

import React from 'react';
import { IsomorphicComponent } from '../isomorphic/component';
import { NAVIGATE_TO_PAGE } from '../isomorphic/actions';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import history from './history';

function reducer(state, action) {
  switch (action.type) {
    case NAVIGATE_TO_PAGE: return Object.assign({}, state, action.page, {currentPath: action.currentPath});
    default: return state;
  }
}

function getRouteData(path, opts) {
  opts = opts || {};
  return superagent.get('/route-data.json', Object.assign({path: path}, opts));
}

function startApp() {
  getRouteData(window.location.pathname, {config: true})
    .then((result) => {
      const store = createStore(reducer, Object.assign({currentPath: window.location.pathname}, result.body));
      ReactDOM.render((
        <Provider store={store}>
          <IsomorphicComponent/>
        </Provider>
      ), document.getElementById('container'));
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
