// ============================================================
// REDUX STORE CONFIGURATION
// ============================================================

// Redux
// -> Predictable State Management Library
//
// Used for:
// - Managing global/shared state
// - Centralized data flow
// - Avoiding prop drilling
// - Managing complex application state

import { createStore } from 'redux';



// ============================================================
// IMPORTANT REDUX CONCEPTS
// ============================================================

/*

REDUX CORE PARTS
----------------

1. STORE
   -> Holds entire application state

2. ACTION
   -> Plain JavaScript object describing
      what should happen

3. REDUCER
   -> Pure function that updates state

4. DISPATCH
   -> Sends action to reducer



REDUX DATA FLOW
----------------

Component
   ↓
dispatch(action)
   ↓
Reducer Executes
   ↓
New State Created
   ↓
Store Updates
   ↓
UI Re-renders



WHY REDUX?
-----------

Redux is useful when:
- Multiple components need same data
- State becomes difficult to manage
- App has complex business logic
- Deep component communication exists



WHEN NOT TO USE REDUX?
-----------------------

Avoid Redux for:
- Very small applications
- Simple local component state
- Temporary UI states

Use React useState() instead when:
- State belongs only to one component



IMPORTANT REDUX RULES
----------------------

1. NEVER mutate state directly

❌ Wrong:
state.counter++;

✅ Correct:
return {
   counter: state.counter + 1
};


2. Reducers must be PURE FUNCTIONS

Pure Function:
- Same input -> same output
- No API calls
- No async code
- No side effects


3. Always return NEW state object

Redux uses IMMUTABILITY.



4. Reducers should only update state

Do NOT:
- Call APIs
- Store data in localStorage
- Perform async tasks



5. State should be serializable

Use:
✅ Objects
✅ Arrays
✅ Strings
✅ Numbers
✅ Booleans

Avoid:
❌ Functions
❌ DOM elements
❌ Class instances



MODERN REDUX NOTE
------------------

createStore() is older Redux syntax.

Modern applications prefer:

configureStore()

from Redux Toolkit because:
- Less boilerplate
- Better defaults
- Built-in DevTools
- Easier reducer logic

*/



// ============================================================
// INITIAL STATE
// ============================================================

// Initial State:
// Default Redux state when application starts

const initialState = {
  counter: 0,
  showCounter: true
};



// ============================================================
// REDUCER FUNCTION
// ============================================================

// Reducer:
// A pure function that receives current state
// and action object, then returns updated state.
//
// Syntax:
// const reducer = (state, action) => {
//    return newState;
// };

const counterReducer = (state = initialState, action) => {

  // INCREMENT ACTION
  if (action.type === 'increment') {
    return {

      // Updating counter state
      counter: state.counter + 1,

      // Preserving existing state
      showCounter: state.showCounter,
    };
  }

  // INCREASE ACTION WITH PAYLOAD
  //
  // Payload:
  // Additional data attached to action object

  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  // DECREMENT ACTION
  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  // TOGGLE ACTION
  //
  // ! operator flips boolean value

  if (action.type === 'toggle') {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }

  // Mandatory default return
  return state;
};



// ============================================================
// CREATING STORE
// ============================================================

// Store:
// Centralized container holding complete app state

const store = createStore(counterReducer);



// ============================================================
// STORE METHODS
// ============================================================

/*

1. store.getState()
--------------------
Returns current Redux state

Example:
console.log(store.getState());



2. store.dispatch(action)
--------------------------
Dispatches action to reducer

Example:
store.dispatch({ type: 'increment' });



3. store.subscribe(listener)
-----------------------------
Runs function whenever state changes

Example:
store.subscribe(() => {
   console.log(store.getState());
});

*/



// Exporting Redux Store
export default store;