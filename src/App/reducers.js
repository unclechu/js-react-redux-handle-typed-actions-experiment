// import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { actions } from './actions';
import { handleTypedActions } from '../helpers';
import T from 'prop-types';
import IMT from 'react-immutable-proptypes';

export default combineReducers({
  // app: handleActions({
  //   [actions.setAppTitle.toString()]: (state, {payload: {title}}) => state.set('title', title)
  // }, fromJS({
  //   title: 'Typed redux actions experiment'
  // }))

  app: handleTypedActions(
    [
      [actions.setAppTitle, (state, {payload: {title}}) => state.set('title', title)]
    ],

    fromJS({
      title: 'Typed redux actions experiment'
    }),

    IMT.mapContains({
      title: T.string.isRequired
    }).isRequired
  )
});
