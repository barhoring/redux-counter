import React, { Component } from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import './styles.scss';

const INITIAL_STATE = {
  count: 0,
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const incrementValue = () => ({ type: INCREMENT });
const decrementValue = () => ({ type: DECREMENT });
const resetValue = () => ({ type: RESET });

const reducer = (state = {}, action) => {
  if (action.type === INCREMENT) return { count: state.count + 1 };
  else if (action.type === DECREMENT) return { count: state.count - 1 };
  else if (action.type === RESET) return { count: 0 };
  return state;
};

const store = createStore(reducer, INITIAL_STATE);

class Counter extends Component {
  render() {
    const { count, increment, decrement, reset } = this.props;
    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

// A better alternative below
/*
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(incrementValue()),
    decrement: () => dispatch(decrementValue()),
    reset: () => dispatch(resetValue()),
  };
}; */

const mapDispatchToProps = {
  increment: incrementValue,
  decrement: decrementValue,
  reset: resetValue,
};

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('root'),
);
