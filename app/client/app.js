import css from '../../app/assets/stylesheets/app.scss';

global.Promise = global.Promise || require("bluebird");
global.superagent = require('superagent-promise')(require('superagent'), Promise);

import React from 'react';
import { IsomorphicComponent } from '../isomorphic/component';
import { NAVIGATE_TO_PAGE } from '../isomorphic/actions';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

function reducer(state, action) {
  switch (action.type) {
    case NAVIGATE_TO_PAGE: return Object.assign({}, state, action.page)
    default: return state;
  }
}

function startApp() {
  superagent.get('/route-data.json', {path: window.location.pathname, config: true})
    .then((result) => {
      ReactDOM.render((
        <Provider store={createStore(reducer, result.body)}>
          <BrowserRouter>
            <IsomorphicComponent/>
          </BrowserRouter>
        </Provider>
      ), document.getElementById('container'));
    });
}

global.navigateToPage = function(dispatch, path) {
  superagent.get('/route-data.json', {path: path, config: true})
    .then((response) => dispatch({
      type: NAVIGATE_TO_PAGE,
      page: response.body
    }));
}

startApp();
