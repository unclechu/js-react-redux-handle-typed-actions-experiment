import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { reducers as appReducer } from './App/redux';
import App from './App';

const store = createStore(combineReducers({
  app: appReducer,
}), Map());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
