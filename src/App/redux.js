import { createActions } from '../helpers';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { handleTypedActions } from '../helpers';
import T from 'prop-types';
import IMT from 'react-immutable-proptypes';

const actions = createActions(__dirname, {
  setAppTitle: T.shape({
    title: T.string.isRequired
  }).isRequired,

  setBarText: T.string
});

const reducers = combineReducers({
  app: handleTypedActions(
    {
      [actions.setAppTitle]: (state, {payload: {title}}) => state.set('title', title),
      [actions.setBarText]: (state, {payload}) => state.set('bar', payload ? payload : 'reset bar text')
    },

    fromJS({
      title: 'Typed redux actions experiment',
      bar: 'bar text'
    }),

    IMT.mapContains({
      title: T.string.isRequired
    }).isRequired
  ),

  foo: handleTypedActions(
    {
      [actions.setAppTitle]: (state, {payload: {title}}) => state.set('anotherTitle', title)
    },

    fromJS({
      anotherTitle: 'default value'
    })
  )
});

export {reducers, actions};
