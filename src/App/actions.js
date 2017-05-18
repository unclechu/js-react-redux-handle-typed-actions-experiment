import { createActions } from '../helpers';
import T from 'prop-types';

const types = {
  setAppTitle: T.shape({
    title: T.string.isRequired
  }).isRequired
};

const actions = createActions(__dirname, types);

export {actions};
