// Redux is a predictable state management library used to manage
// and centralize application state in JavaScript applications.
//
// It is commonly used with React for handling global/shared state
// such as authentication, cart data, theme, notifications, etc.

// createStore() is a Redux function used to create a centralized store.
//
// Syntax:
// const store = createStore(reducerFunction);
//
// Parameters:
// 1. reducerFunction -> A pure function that determines how state changes.
//
// NOTE:
// In modern Redux applications, Redux Toolkit's configureStore()
// is preferred over createStore() because it provides better defaults,
// middleware support, DevTools integration, and cleaner syntax.

import { createStore } from 'redux';



// ------------------------------------------------------------
// REDUCER FUNCTION
// ------------------------------------------------------------

// A Reducer is a PURE FUNCTION in Redux.
//
// Professional Definition:
// A reducer is a function that takes the current state and an action
// object as arguments and returns a NEW UPDATED STATE.
//
// Syntax:
// const reducer = (state, action) => {
//      return newState;
// }
//
// Important Rules of Reducers:
// 1. Must be pure functions
// 2. Should not modify existing state directly
// 3. Must return a new state object
// 4. Should not perform side effects
//    (API calls, localStorage updates, async operations, etc.)
//
// Parameters:
// state  -> Current application state
// action -> Object describing what operation should happen
//
// Default State:
// state = { counter: 0 }
//
// This initializes the state when Redux starts for the first time.

const counterReducer = (state = { counter: 0 }, action) => {


  // ------------------------------------------------------------
  // ACTION OBJECT
  // ------------------------------------------------------------

  // Actions are plain JavaScript objects that describe
  // WHAT happened in the application.
  //
  // Professional Definition:
  // An action is a payload of information that sends data
  // from the application to the Redux store.
  //
  // Basic Syntax:
  // {
  //    type: "ACTION_NAME"
  // }
  //
  // Example:
  // {
  //    type: "increment"
  // }
  //
  // "type" property is mandatory in Redux actions.



  // ------------------------------------------------------------
  // INCREMENT ACTION
  // ------------------------------------------------------------

  // Checks whether the dispatched action type is "increment"

  if (action.type === 'increment') {


    // NEVER mutate the existing state directly
    //
    // ❌ Wrong:
    // state.counter++;
    //
    // Redux requires IMMUTABLE updates.

    return {

      // Returning a NEW STATE OBJECT

      counter: state.counter + 1,

    };

  }



  // ------------------------------------------------------------
  // DECREMENT ACTION
  // ------------------------------------------------------------

  // Checks whether the dispatched action type is "decrement"

  if (action.type === 'decrement') {

    return {

      // Returns updated state with decreased counter value

      counter: state.counter - 1,

    };

  }



  // ------------------------------------------------------------
  // DEFAULT RETURN
  // ------------------------------------------------------------

  // If no matching action type is found,
  // the current state must be returned unchanged.
  //
  // This is mandatory in reducers.

  return state;

};



// ------------------------------------------------------------
// STORE
// ------------------------------------------------------------

// Store is the CENTRALIZED STATE CONTAINER in Redux.
//
// Professional Definition:
// A store is an object that holds the complete state tree
// of the application.
//
// Responsibilities of Store:
// 1. Holds application state
// 2. Allows state access using getState()
// 3. Allows state updates using dispatch()
// 4. Registers listeners using subscribe()

const store = createStore(counterReducer);



// ------------------------------------------------------------
// STORE METHODS
// ------------------------------------------------------------

// 1. store.getState()
//    -> Returns current state
//
// Example:
// console.log(store.getState());



// 2. store.dispatch(action)
//    -> Sends an action to reducer
//
// Example:
// store.dispatch({ type: 'increment' });



// 3. store.subscribe(listener)
//    -> Executes function whenever state changes
//
// Example:
// store.subscribe(() => {
//    console.log(store.getState());
// });



// Exporting store so it can be used throughout the application

export default store;