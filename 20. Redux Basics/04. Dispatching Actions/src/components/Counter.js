// ------------------------------------------------------------
// REACT-REDUX HOOKS
// ------------------------------------------------------------

// useSelector()
// -> Used to READ data from Redux Store
//
// useDispatch()
// -> Used to SEND/DISPATCH actions to Redux Store
//
// Professional Definition:
// useDispatch is a React-Redux Hook that returns
// the store's dispatch function, allowing components
// to trigger state updates by dispatching actions.
//
// Syntax:
// const dispatch = useDispatch();
//
// Example:
// dispatch({ type: 'increment' });

import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';



// ------------------------------------------------------------
// COUNTER COMPONENT
// ------------------------------------------------------------

const Counter = () => {


  // ------------------------------------------------------------
  // useDispatch Hook
  // ------------------------------------------------------------

  // dispatch variable now stores Redux dispatch function.
  //
  // dispatch() sends actions to the reducer.
  //
  // Flow:
  // Component -> dispatch(action) -> Reducer -> Updated State

  const dispatch = useDispatch();



  // ------------------------------------------------------------
  // useSelector Hook
  // ------------------------------------------------------------

  // Accessing counter value from Redux Store
  //
  // Redux State Structure:
  // {
  //    counter: 0
  // }

  const counter = useSelector(state => state.counter);



  // ------------------------------------------------------------
  // INCREMENT HANDLER
  // ------------------------------------------------------------

  // Executes when Increment button is clicked.
  //
  // dispatch() sends an action object to Redux reducer.
  //
  // Action Object:
  // {
  //    type: 'increment'
  // }
  //
  // Reducer checks action.type and updates state accordingly.

  const incrementHandler = () => {

    dispatch({ type: 'increment' });

  };



  // ------------------------------------------------------------
  // DECREMENT HANDLER
  // ------------------------------------------------------------

  // Dispatching "decrement" action to reducer.

  const decrementHandler = () => {

    dispatch({ type: 'decrement' });

  };



  // ------------------------------------------------------------
  // TOGGLE HANDLER
  // ------------------------------------------------------------

  // Currently empty.
  //
  // Can later be used for:
  // - toggling visibility
  // - dispatching another Redux action
  // - changing UI states

  const toggleCounterHandler = () => {};



  // ------------------------------------------------------------
  // JSX UI
  // ------------------------------------------------------------

  return (

    <main className={classes.counter}>

      {/* Application Heading */}
      <h1>Redux Counter</h1>


      {/*
        Displaying Redux counter state

        Component automatically re-renders
        whenever counter value changes.
      */}

      <div className={classes.value}>{counter}</div>


      {/*
        Button Section
      */}

      <div>

        {/*
          Increment Button

          onClick triggers incrementHandler()
        */}

        <button onClick={incrementHandler}>
          Increment
        </button>


        {/*
          Decrement Button

          onClick triggers decrementHandler()
        */}

        <button onClick={decrementHandler}>
          Decrement
        </button>

      </div>


      {/* Toggle Button */}

      <button onClick={toggleCounterHandler}>
        Toggle Counter
      </button>

    </main>
  );
};



// Exporting component

export default Counter;