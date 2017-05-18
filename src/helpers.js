import { reduce } from 'lodash';
import { mapValues, snakeCase } from 'lodash';
import { createAction } from 'redux-actions';
import { handleActions } from 'redux-actions';
import T, { checkPropTypes } from 'prop-types';

const typeSpecsCollection = {};

// `.toString()` of action returns action type
// `.payloadTypeSpec` contains payload type checker
export const createActions = (scope, types) => mapValues(types, (typeSpec, key) => {
  const actionCreator = createAction(`${scope.toUpperCase()}@${snakeCase(key).toUpperCase()}`);
  typeSpecsCollection[actionCreator] = typeSpec;
  return actionCreator;
}, {});

// Api pretty similar to `handleActions`.
// Additional third arguments is a type spec for state.
// Checks types for:
//   1. Initial state (optional)
//   2. Input state and payload for reducer
//   3. New state got from reducer (optional)
export const handleTypedActions = (handlers, initialState, stateTypeSpec = T.any) => {
  const result = reduce(handlers, (acc, actionReducer, actionType) => {
    if (process.env.NODE_ENV !== 'production') {
      acc[actionType] = (state, action) => {

        checkPropTypes(
          { state: stateTypeSpec, payload: typeSpecsCollection[actionType] },
          { state, payload: action.payload }
        );

        const newState = actionReducer(state, action);

        checkPropTypes(
          { newState: stateTypeSpec },
          { newState }
        );

        return newState;
      };
    } else {
      acc[actionType] = actionReducer;
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
