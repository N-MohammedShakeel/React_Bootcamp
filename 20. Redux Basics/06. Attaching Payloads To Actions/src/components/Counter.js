// ============================================================
// COUNTER COMPONENT - DISPATCHING ACTIONS WITH PAYLOAD
// ============================================================

// ------------------------------------------------------------
// IMPORTS
// ------------------------------------------------------------

// useSelector()
// -> Reads data from Redux Store
//
// useDispatch()
// -> Dispatches actions to Redux Store

import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';



// ------------------------------------------------------------
// FUNCTIONAL COMPONENT
// ------------------------------------------------------------

const Counter = () => {


  // ------------------------------------------------------------
  // useDispatch Hook
  // ------------------------------------------------------------

  // Returns Redux dispatch function

  const dispatch = useDispatch();



  // ------------------------------------------------------------
  // useSelector Hook
  // ------------------------------------------------------------

  // Reading counter value from Redux Store
  //
  // Current State Structure:
  // {
  //    counter: 0
  // }

  const counter = useSelector((state) => state.counter);




  // ------------------------------------------------------------
  // INCREMENT HANDLER
  // ------------------------------------------------------------

  // Dispatching a basic action object
  //
  // Action:
  // {
  //    type: 'increment'
  // }

  const incrementHandler = () => {

    dispatch({ type: 'increment' });

  };




  // ------------------------------------------------------------
  // ACTION PAYLOAD
  // ------------------------------------------------------------

  // Professional Definition:
  // A payload is additional data attached to an action object.
  //
  // Payload allows reducers to receive dynamic/custom values.
  //
  // Instead of hardcoding values in reducer,
  // we can pass data through actions.
  //
  // Example:
  // {
  //    type: 'increase',
  //    amount: 10
  // }
  //
  // Here:
  // type   -> describes what action should happen
  // amount -> extra data (payload)



  // ------------------------------------------------------------
  // INCREASE HANDLER
  // ------------------------------------------------------------

  // Dispatching action with PAYLOAD
  //
  // amount: 10 acts as payload data.

  const increaseHandler = () => {

    dispatch({

      type: 'increase',

      amount: 10

    });

  };




  // ------------------------------------------------------------
  // DECREMENT HANDLER
  // ------------------------------------------------------------

  const decrementHandler = () => {

    dispatch({ type: 'decrement' });

  };




  // ------------------------------------------------------------
  // TOGGLE HANDLER
  // ------------------------------------------------------------

  const toggleCounterHandler = () => {};




  // ------------------------------------------------------------
  // JSX UI
  // ------------------------------------------------------------

  return (

    <main className={classes.counter}>

      <h1>Redux Counter</h1>


      {/*
        Displaying Redux counter value
      */}

      <div className={classes.value}>

        {counter}

      </div>


      <div>


        {/* Increment by 1 */}

        <button onClick={incrementHandler}>

          Increment

        </button>



        {/*
          Increase by custom value
          (10 in this case)
        */}

        <button onClick={increaseHandler}>

          Increase by 10

        </button>



        {/* Decrement by 1 */}

        <button onClick={decrementHandler}>

          Decrement

        </button>

      </div>


      <button onClick={toggleCounterHandler}>

        Toggle Counter

      </button>

    </main>
  );
};

export default Counter;