import css from '../../app/assets/stylesheets/app.scss';

global.Promise = global.Promise || require("bluebird");
global.superagent = require('superagent-promise')(require('superagent'), Promise);

import React from 'react';
import { IsomorphicComponent } from '../isomorphic/component';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
const {createStore} = require("redux");

// Load Data
// Mount React Component

function startApp() {
  superagent.get('/route-data.json', {path: window.location.pathname, config: true})
    .then((result) => {
      ReactDOM.render((
        <Provider store={createStore((state) => state, result.body)}>
          <BrowserRouter>
            <IsomorphicComponent/>
          </BrowserRouter>
        </Provider>
      ), document.getElementById('container'));
    });
}

startApp();
