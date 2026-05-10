// ============================================================
// REDUX TOOLKIT (RTK) - MODERN REDUX APPROACH
// ============================================================

// Redux Toolkit (RTK)
// -> Official recommended way to write Redux logic
//
// Developed by Redux Team itself.
//
// Professional Definition:
// Redux Toolkit is a package that simplifies Redux
// development by reducing boilerplate code and
// providing best practices out of the box.



// ============================================================
// WHY REDUX TOOLKIT WAS INTRODUCED?
// ============================================================

/*

PROBLEMS IN TRADITIONAL REDUX
------------------------------

Old Redux required:
- Too much boilerplate code
- Manual immutable updates
- Separate action creators
- Separate action types
- Complex store setup
- Additional middleware configuration

Example in old Redux:
----------------------

const INCREMENT = 'increment';

const incrementAction = () => {
   return { type: INCREMENT };
};

if(action.type === INCREMENT) {}


This created unnecessary complexity.



REDUX TOOLKIT SOLVES:
----------------------

✅ Less boilerplate
✅ Cleaner reducers
✅ Automatic immutable updates
✅ Built-in DevTools support
✅ Easier configuration
✅ Better scalability
✅ Built-in middleware
✅ Cleaner action creation



MODERN REDUX STANDARD
----------------------

Today, Redux Toolkit is the STANDARD way
to write Redux applications.

Official Redux documentation itself
recommends Redux Toolkit.



MAIN FEATURES OF RTK
---------------------

1. configureStore()
   -> Simplified store setup

2. createSlice()
   -> Automatically creates:
      - reducers
      - actions
      - action types

3. Built-in Immer Library
   -> Allows writing mutable-looking code safely

4. Built-in Redux DevTools support

*/



// ============================================================
// IMPORTS
// ============================================================

// createSlice()
// -> Creates slice of Redux state
//
// configureStore()
// -> Creates Redux Store with better defaults

import { createSlice, configureStore } from '@reduxjs/toolkit';



// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  counter: 0,
  showCounter: true
};



// ============================================================
// CREATE SLICE
// ============================================================

// createSlice()
// -> Combines:
//    - State
//    - Reducers
//    - Actions
//
// into one centralized structure.
//
// Syntax:
//
// const slice = createSlice({
//    name: 'sliceName',
//    initialState,
//    reducers: {}
// });

const counterSlice = createSlice({

  // Unique slice name
  //
  // Used internally by Redux Toolkit
  name: 'counter',

  // Initial Redux state
  initialState,

  // Reducer methods
  reducers: {

    // ========================================================
    // INCREMENT REDUCER
    // ========================================================

    // IMPORTANT:
    // This looks like direct state mutation:
    //
    // state.counter++;
    //
    // But Redux Toolkit uses IMMER internally.
    //
    // Immer safely converts mutable-looking code
    // into immutable updates behind the scenes.

    increment(state) {
      state.counter++;
    },



    // ========================================================
    // DECREMENT REDUCER
    // ========================================================

    decrement(state) {
      state.counter--;
    },



    // ========================================================
    // INCREASE WITH PAYLOAD
    // ========================================================

    // action.payload
    // -> Default payload property in Redux Toolkit
    //
    // Example:
    // dispatch(counterActions.increase(10))
    //
    // Generated Action:
    // {
    //    type: "counter/increase",
    //    payload: 10
    // }

    increase(state, action) {
      state.counter = state.counter + action.payload;
    },



    // ========================================================
    // TOGGLE COUNTER
    // ========================================================

    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});



// ============================================================
// CONFIGURE STORE
// ============================================================

// configureStore()
// -> Modern replacement for createStore()
//
// Benefits:
// ✅ Simpler syntax
// ✅ Better defaults
// ✅ Built-in middleware
// ✅ Redux DevTools support
// ✅ Better debugging

const store = configureStore({

  // Reducer from slice
  reducer: counterSlice.reducer

});



// ============================================================
// AUTOMATIC ACTION CREATION
// ============================================================

// createSlice() automatically generates:
//
// 1. Action Creators
// 2. Action Types
//
// No need to manually create them.
//
// Example Generated Actions:
//
// counterActions.increment()
// counterActions.decrement()
// counterActions.increase(payload)

export const counterActions = counterSlice.actions;



// Exporting Redux Store
export default store;