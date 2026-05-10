// ============================================================
// COUNTER COMPONENT - MULTIPLE STATE PROPERTIES
// ============================================================

import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';

// useSelector()
// -> Reads data from Redux Store
//
// useDispatch()
// -> Dispatches actions to Redux Store

const Counter = () => {

  // Returns Redux dispatch function
  const dispatch = useDispatch();

  // Redux State Structure:
  // {
  //    counter: 0,
  //    showCounter: true
  // }

  // Accessing counter state
  const counter = useSelector((state) => state.counter);

  // Accessing boolean state for conditional rendering
  const show = useSelector((state) => state.showCounter);

  // Dispatching increment action
  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };

  // Dispatching action with payload
  //
  // Payload:
  // Additional data attached to an action object
  const increaseHandler = () => {
    dispatch({
      type: 'increase',
      amount: 10
    });
  };

  // Dispatching decrement action
  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  // Dispatching toggle action
  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' });
  };

  return (
    <main className={classes.counter}>

      <h1>Redux Counter</h1>

      {/* 
        CONDITIONAL RENDERING

        Syntax:
        condition && JSX

        If show === true
        -> Counter visible

        If show === false
        -> Counter hidden
      */}

      {show && <div className={classes.value}>{counter}</div>}

      <div>

        {/* Increment Counter */}
        <button onClick={incrementHandler}>
          Increment
        </button>

        {/* Increase Counter by Payload Value */}
        <button onClick={increaseHandler}>
          Increase by 10
        </button>

        {/* Decrement Counter */}
        <button onClick={decrementHandler}>
          Decrement
        </button>

      </div>

      {/* Toggle Counter Visibility */}
      <button onClick={toggleCounterHandler}>
        Toggle Counter
      </button>

    </main>
  );
};

export default Counter;