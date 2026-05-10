// ============================================================
// REDUX STORE - MULTIPLE STATE PROPERTIES
// ============================================================

import { createStore } from 'redux';

// INITIAL STATE
//
// Professional Definition:
// Initial State is the default state object
// used when Redux Store initializes.

const initialState = {
  counter: 0,
  showCounter: true
};

// REDUCER FUNCTION
//
// Reducer:
// A pure function that receives current state
// and action object, then returns new state.

const counterReducer = (state = initialState, action) => {

  // INCREMENT ACTION
  if (action.type === 'increment') {
    return {

      // Updating counter state
      counter: state.counter + 1,

      // Preserving existing state
      showCounter: state.showCounter
    };
  }

  // INCREASE ACTION WITH PAYLOAD
  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    };
  }

  // DECREMENT ACTION
  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    };
  }

  // TOGGLE ACTION
  //
  // ! operator flips boolean value
  //
  // true  -> false
  // false -> true

  if (action.type === 'toggle') {
    return {
      showCounter: !state.showCounter,
      counter: state.counter
    };
  }

  // Mandatory default return
  return state;
};

// Creating centralized Redux Store
const store = createStore(counterReducer);

// Exporting Store
export default store;