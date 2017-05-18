import React from 'react';
import { compose, setPropTypes, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { actions } from './redux';
import T from 'prop-types';

const App = ({
  title,
  onTitleInputChange,
  appTitle,
  updateTitle,
  anotherTitle,
  bar,
  setBarText,
  resetBarText,
}) => <div>
  <h1>{appTitle}</h1>
  <form>
    <input type="text" value={title} onChange={onTitleInputChange}/>
    {' '}
    <button onClick={updateTitle}>Change title</button>
  </form>
  <h2>Additional title field from store: {anotherTitle}</h2>
  <h3>Bar text: {bar}</h3>
  <button onClick={setBarText}>Change bar text</button>
  {' '}
  <button onClick={resetBarText}>Reset bar text</button>
</div>;

export default compose(
  connect(
    store => ({
      appTitle     : store.getIn(['app', 'app', 'title']),
      bar          : store.getIn(['app', 'app', 'bar']),
      anotherTitle : store.getIn(['app', 'foo', 'anotherTitle'])
    }),

    {
      setAppTitle  : actions.setAppTitle,
      setBarText   : () => actions.setBarText('new bar text'),
      resetBarText : () => actions.setBarText(),
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
    appTitle           : T.string.isRequired,
    updateTitle        : T.func.isRequired,
    title              : T.string.isRequired,
    setTitle           : T.func.isRequired,
    onTitleInputChange : T.func.isRequired,
    anotherTitle       : T.string.isRequired,
    bar                : T.string.isRequired,
    setBarText         : T.func.isRequired,
    resetBarText       : T.func.isRequired,
  })
)(App);
