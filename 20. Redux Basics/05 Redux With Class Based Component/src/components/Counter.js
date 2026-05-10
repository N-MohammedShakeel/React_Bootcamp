// ------------------------------------------------------------
// REDUX WITH CLASS-BASED COMPONENTS
// ------------------------------------------------------------

// Before React Hooks were introduced,
// Redux was commonly used with CLASS COMPONENTS.
//
// Instead of:
// - useSelector()
// - useDispatch()
//
// Class components use:
// - connect()
// - mapStateToProps()
// - mapDispatchToProps()



// ------------------------------------------------------------
// IMPORTS
// ------------------------------------------------------------

// connect()
// -> Higher Order Component (HOC) provided by react-redux
//
// Professional Definition:
// connect() connects a React component to the Redux Store,
// allowing the component to access state and dispatch actions.
//
// Syntax:
// export default connect(
//      mapStateToProps,
//      mapDispatchToProps
// )(ComponentName);

import { connect } from 'react-redux';

import { Component } from 'react';

import classes from './Counter.module.css';



// ------------------------------------------------------------
// FUNCTIONAL COMPONENT VERSION (COMMENTED)
// ------------------------------------------------------------

// This section shows the MODERN HOOK-BASED APPROACH.
//
// Hooks used:
// - useSelector()
// - useDispatch()
//
// Mostly preferred in modern React applications.

/*

const Counter = () => {

  const dispatch = useDispatch();

  const counter = useSelector(state => state.counter);


  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };

  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  const toggleCounterHandler = () => {};


  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>

      <div className={classes.value}>{counter}</div>

      <div>
        <button onClick={incrementHandler}>Increment</button>

        <button onClick={decrementHandler}>Decrement</button>
      </div>

      <button onClick={toggleCounterHandler}>
        Toggle Counter
      </button>
    </main>
  );
};

export default Counter;

*/



// ------------------------------------------------------------
// CLASS-BASED COMPONENT
// ------------------------------------------------------------

// Professional Definition:
// A class component is an ES6 class that extends
// React.Component and contains a render() method.
//
// Syntax:
// class ComponentName extends Component {
//      render() {
//          return JSX;
//      }
// }

class Counter extends Component {


  // ------------------------------------------------------------
  // INCREMENT HANDLER
  // ------------------------------------------------------------

  // this.props.increment() comes from mapDispatchToProps()

  incrementHandler() {

    this.props.increment();

  }



  // ------------------------------------------------------------
  // DECREMENT HANDLER
  // ------------------------------------------------------------

  decrementHandler() {

    this.props.decrement();

  }



  // ------------------------------------------------------------
  // TOGGLE HANDLER
  // ------------------------------------------------------------

  toggleCounterHandler() {}




  // ------------------------------------------------------------
  // RENDER METHOD
  // ------------------------------------------------------------

  // render() is mandatory in class components.
  //
  // It returns JSX UI.

  render() {

    return (

      <main className={classes.counter}>

        {/* Heading */}

        <h1>Redux Counter</h1>


        {/*
          Accessing Redux state using props

          this.props.counter comes from mapStateToProps()
        */}

        <div className={classes.value}>

          {this.props.counter}

        </div>


        <div>

          {/*
            bind(this)

            Why needed?
            ----------------
            In class components, normal methods lose
            their "this" context when passed as callbacks.
            
            bind(this) ensures that "this" refers
            to the current class instance.
          */}

          <button onClick={this.incrementHandler.bind(this)}>

            Increment

          </button>


          <button onClick={this.decrementHandler.bind(this)}>

            Decrement

          </button>

        </div>


        {/* Toggle Button */}

        <button onClick={this.toggleCounterHandler}>

          Toggle Counter

        </button>

      </main>
    );
  }
}




// ------------------------------------------------------------
// mapStateToProps
// ------------------------------------------------------------

// Professional Definition:
// mapStateToProps is a function that maps
// Redux Store state to component props.
//
// Purpose:
// Allows class component to READ Redux state.
//
// Syntax:
// const mapStateToProps = (state) => {
//      return {
//          propName: state.someValue
//      };
// }

const mapStateToProps = state => {

  return {

    // Makes Redux state available as:
    // this.props.counter

    counter: state.counter

  };

};




// ------------------------------------------------------------
// mapDispatchToProps
// ------------------------------------------------------------

// Professional Definition:
// mapDispatchToProps maps dispatch functions
// to component props.
//
// Purpose:
// Allows class component to DISPATCH Redux actions.
//
// Syntax:
// const mapDispatchToProps = (dispatch) => {
//      return {
//          actionFunction: () => dispatch(action)
//      };
// }

const mapDispatchToProps = dispatch => {

  return {


    // Available as:
    // this.props.increment()

    increment: () => dispatch({ type: 'increment' }),


    // Available as:
    // this.props.decrement()

    decrement: () => dispatch({ type: 'decrement' }),

  };

};




// ------------------------------------------------------------
// CONNECTING COMPONENT TO REDUX STORE
// ------------------------------------------------------------

// connect() creates a connection between:
// React Component <-> Redux Store
//
// Flow:
// Redux Store
//      ↓
// mapStateToProps
//      ↓
// Component Props
//
// Component
//      ↓
// mapDispatchToProps
//      ↓
// dispatch(action)

export default connect(

  mapStateToProps,

  mapDispatchToProps

)(Counter);