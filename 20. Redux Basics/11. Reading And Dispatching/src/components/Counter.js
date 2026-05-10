// ============================================================
// READING & DISPATCHING DATA IN REDUX TOOLKIT
// ============================================================

// useSelector()
// -> Reads data from Redux Store
//
// useDispatch()
// -> Dispatches actions to Redux Store

import { useSelector, useDispatch } from 'react-redux';

// Importing auto-generated Redux Toolkit actions
import { counterActions } from '../store/index';

import classes from './Counter.module.css';



// ============================================================
// FUNCTIONAL COMPONENT
// ============================================================

const Counter = () => {

  // useDispatch()
  // -> Returns Redux dispatch function

  const dispatch = useDispatch();



  // ==========================================================
  // READING STATE USING useSelector
  // ==========================================================

  // Final Redux State Structure:
  //
  // {
  //    counter: {
  //       counter: 0,
  //       showCounter: true
  //    },
  //
  //    auth: {
  //       isAuthenticated: false
  //    }
  // }
  //
  // Since counter slice is stored inside:
  // state.counter
  //
  // We access values like:
  // state.counter.counter
  // state.counter.showCounter



  // Reading counter value from counter slice

  const counter = useSelector((state) => state.counter.counter);



  // Reading visibility boolean state

  const show = useSelector((state) => state.counter.showCounter);



  // ==========================================================
  // DISPATCHING ACTIONS
  // ==========================================================

  // Redux Toolkit automatically generates:
  // ✅ Action creators
  // ✅ Action types
  //
  // No need to manually write:
  //
  // dispatch({ type: 'increment' })



  // Increment Counter
  const incrementHandler = () => {

    dispatch(counterActions.increment());

  };



  // Increase Counter using Payload
  //
  // Payload:
  // Additional data attached to action
  //
  // Generated Action Object:
  //
  // {
  //    type: 'counter/increase',
  //    payload: 10
  // }

  const increaseHandler = () => {

    dispatch(counterActions.increase(10));

  };



  // Decrement Counter
  const decrementHandler = () => {

    dispatch(counterActions.decrement());

  };



  // Toggle Counter Visibility
  const toggleCounterHandler = () => {

    dispatch(counterActions.toggleCounter());

  };



  // ==========================================================
  // JSX UI
  // ==========================================================

  return (

    <main className={classes.counter}>

      <h1>Redux Counter</h1>


      {/* 
        CONDITIONAL RENDERING
        
        Counter only visible when:
        show === true
      */}

      {show && <div className={classes.value}>{counter}</div>}


      <div>

        {/* Increment Button */}
        <button onClick={incrementHandler}>
          Increment
        </button>


        {/* Increase by Payload Value */}
        <button onClick={increaseHandler}>
          Increase by 10
        </button>


        {/* Decrement Button */}
        <button onClick={decrementHandler}>
          Decrement
        </button>

      </div>


      {/* Toggle Visibility Button */}
      <button onClick={toggleCounterHandler}>
        Toggle Counter
      </button>

    </main>
  );
};



// Exporting Component

export default Counter;