// ============================================================
// REDUX STORE WITH PAYLOAD HANDLING
// ============================================================

// createStore()
// -> Creates Redux Store

import { createStore } from 'redux';




// ------------------------------------------------------------
// REDUCER FUNCTION
// ------------------------------------------------------------

// Reducer receives:
// 1. Current State
// 2. Action Object
//
// Returns:
// New Updated State

const counterReducer = (state = { counter: 0 }, action) => {


  // ------------------------------------------------------------
  // INCREMENT ACTION
  // ------------------------------------------------------------

  if (action.type === 'increment') {

    return {

      counter: state.counter + 1,

    };

  }




  // ------------------------------------------------------------
  // INCREASE ACTION WITH PAYLOAD
  // ------------------------------------------------------------

  // Accessing payload data using:
  // action.amount
  //
  // Current Action Object:
  // {
  //    type: 'increase',
  //    amount: 10
  // }
  //
  // Reducer dynamically updates state
  // using payload value.

  if (action.type === 'increase') {

    return {

      // Adding dynamic value from payload

      counter: state.counter + action.amount,

    };

  }




  // ------------------------------------------------------------
  // DECREMENT ACTION
  // ------------------------------------------------------------

  if (action.type === 'decrement') {

    return {

      counter: state.counter - 1,

    };

  }




  // ------------------------------------------------------------
  // DEFAULT RETURN
  // ------------------------------------------------------------

  // Mandatory in reducers

  return state;

};




// ------------------------------------------------------------
// CREATING STORE
// ------------------------------------------------------------

// Store holds complete Redux state

const store = createStore(counterReducer);




// ------------------------------------------------------------
// EXPORTING STORE
// ------------------------------------------------------------

export default store;