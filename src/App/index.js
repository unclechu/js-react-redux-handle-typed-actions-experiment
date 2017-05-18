import React from 'react';
import { compose, setPropTypes, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { actions } from './actions';
import T from 'prop-types';

const App = ({title, onTitleInputChange, appTitle, updateTitle, anotherTitle}) => <div>
  <h1>{appTitle}</h1>
  <form>
    <input type="text" value={title} onChange={onTitleInputChange}/>
    {' '}
    <button onClick={updateTitle}>change title</button>
  </form>
  <h2>{anotherTitle}</h2>
</div>;

export default compose(
  connect(
    store => ({
      appTitle: store.getIn(['app', 'app', 'title']),
      anotherTitle: store.getIn(['app', 'foo', 'anotherTitle'])
    }),

    {
      setAppTitle: actions.setAppTitle
    }
  ),

  withState('title', 'setTitle', ({appTitle}) => appTitle),

  withHandlers({
    updateTitle: ({setAppTitle, title}) => e => {
      e.preventDefault();
      setAppTitle({title});
    },

    onTitleInputChange: ({setTitle}) => e => {
      setTitle(e.currentTarget.value);
    }
  }),

  setPropTypes({
    appTitle: T.string.isRequired,
    updateTitle: T.func.isRequired,
    title: T.string.isRequired,
    setTitle: T.func.isRequired,
    onTitleInputChange: T.func.isRequired,
    anotherTitle: T.string.isRequired,
  })
)(App);
