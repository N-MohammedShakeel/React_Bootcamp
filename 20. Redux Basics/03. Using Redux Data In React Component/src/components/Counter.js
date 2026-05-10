

// useSelector is a React-Redux Hook used to extract/read data
// from the Redux Store inside React components.
//
// Professional Definition:
// useSelector() allows functional components to subscribe
// to Redux store updates and retrieve specific pieces of state.
//
// Syntax:
// const data = useSelector((state) => {
//      return state.someValue;
// });
//
// Important Notes:
// 1. Component automatically re-renders when selected state changes
// 2. It replaces mapStateToProps() used in older class components
// 3. Only used for READING state
// 4. Must be used inside functional components

import { useSelector } from 'react-redux';

import classes from './Counter.module.css';



// ------------------------------------------------------------
// FUNCTIONAL COMPONENT
// ------------------------------------------------------------

// Counter Component displays counter value from Redux Store

const Counter = () => {


  // ------------------------------------------------------------
  // ACCESSING REDUX STATE USING useSelector
  // ------------------------------------------------------------

  // state -> Entire Redux Store State
  //
  // Current Redux State Structure:
  // {
  //    counter: 0
  // }
  //
  // state.counter accesses only the counter property.
  //
  // useSelector internally subscribes this component
  // to Redux store changes.

  const counter = useSelector(state => state.counter);



  // ------------------------------------------------------------
  // EVENT HANDLER FUNCTION
  // ------------------------------------------------------------

  // Function that will execute when button is clicked.
  //
  // Currently empty.
  //
  // Later this can be used for:
  // - dispatching actions
  // - toggling UI
  // - hiding/showing counter
  // etc.

  const toggleCounterHandler = () => {};



  // ------------------------------------------------------------
  // JSX UI
  // ------------------------------------------------------------

  return (

    // main element styled using CSS Modules

    <main className={classes.counter}>

      {/* Heading */}
      <h1>Redux Counter</h1>


      {/*
        Displaying counter value from Redux Store

        The value updates automatically whenever
        Redux state changes.
      */}

      <div className={classes.value}>{counter}</div>


      {/*
        Button triggering toggleCounterHandler()
      */}

      <button onClick={toggleCounterHandler}>
        Toggle Counter
      </button>

    </main>
  );
};

// Exporting component for use in other files

export default Counter;