// ============================================================
// COUNTER COMPONENT USING REDUX TOOLKIT
// ============================================================

// useSelector()
// -> Reads Redux state
//
// useDispatch()
// -> Dispatches Redux actions

import { useSelector, useDispatch } from 'react-redux';



// Importing auto-generated Redux Toolkit actions
import { counterActions } from '../store/index';

import classes from './Counter.module.css';



// ============================================================
// FUNCTIONAL COMPONENT
// ============================================================

const Counter = () => {

  // Redux dispatch function
  const dispatch = useDispatch();



  // Reading counter value from Redux Store
  const counter = useSelector((state) => state.counter);



  // Reading visibility boolean state
  const show = useSelector((state) => state.showCounter);




  // ==========================================================
  // DISPATCHING RTK ACTIONS
  // ==========================================================

  // OLD REDUX:
  //
  // dispatch({ type: 'increment' });
  //
  // REDUX TOOLKIT:
  //
  // dispatch(counterActions.increment())
  //
  // Cleaner and safer approach.



  // Increment Action
  const incrementHandler = () => {

    dispatch(counterActions.increment());

  };



  // Increase Action with Payload
  //
  // Payload automatically stored inside:
  // action.payload

  const increaseHandler = () => {

    dispatch(counterActions.increase(10));

    // Generated Action Object:
    //
    // {
    //    type: 'counter/increase',
    //    payload: 10
    // }

  };



  // Decrement Action
  const decrementHandler = () => {

    dispatch(counterActions.decrement());

  };



  // Toggle Visibility Action
  const toggleCounterHandler = () => {

    dispatch(counterActions.toggleCounter());

  };




  // ==========================================================
  // JSX UI
  // ==========================================================

  return (

    <main className={classes.counter}>

      <h1>Redux Counter</h1>


      {/* Conditional Rendering */}

      {show && (

        <div className={classes.value}>

          {counter}

        </div>

      )}


      <div>

        <button onClick={incrementHandler}>
          Increment
        </button>

        <button onClick={increaseHandler}>
          Increase by 10
        </button>

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



// Exporting Component
export default Counter;