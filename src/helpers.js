import { reduce } from 'lodash';
import { mapValues, snakeCase } from 'lodash';
import { createAction } from 'redux-actions';
import { handleActions } from 'redux-actions';
import { checkPropTypes } from 'prop-types';

// `.toString()` of action returns action type
// `.payloadTypeSpec` contains payload type checker
export const createActions = (scope, types) => mapValues(types, (typeSpec, key) => {
  const actionCreator = createAction(`${scope.toUpperCase()}@${snakeCase(key).toUpperCase()}`);
  actionCreator.payloadTypeSpec = typeSpec;
  return actionCreator;
}, {});

// api almost same as `handleActions` but additional third arguments is a type spec for state
// checks types for:
//   1. initial state
//   2. input state and payload for reducer
//   3. new state got from reducer
export const handleTypedActions = (handlers, initialState, stateTypeSpec) => {
  const result = reduce(handlers, (acc, [actionCreator, reducer]) => {
    if (process.env.NODE_ENV !== 'production') {
      acc[actionCreator.toString()] = (state, action) => {

        checkPropTypes(
          { state: stateTypeSpec, payload: actionCreator.payloadTypeSpec },
          { state, payload: action.payload }
        );

        const newState = reducer(state, action);

        checkPropTypes(
          { newState: stateTypeSpec },
          { newState }
        );

        return newState;
      };
    } else {
      acc[actionCreator.toString()] = reducer;
    }

    return acc;
  }, {});

  // checking initial state
  if (process.env.NODE_ENV !== 'production') {
    checkPropTypes(
      { initialState: stateTypeSpec },
      { initialState: initialState }
    )
  }

  return handleActions(result, initialState);
};
