// ============================================================
// COUNTER SLICE
// ============================================================

import { createSlice } from '@reduxjs/toolkit';



// ============================================================
// INITIAL COUNTER STATE
// ============================================================

const initialCounterState = {
  counter: 0,
  showCounter: true,
};



// ============================================================
// COUNTER SLICE
// ============================================================

// Handles counter-related state logic
//
// State Path:
// state.counter

const counterSlice = createSlice({

  // Slice name
  name: 'counter',

  // Initial state
  initialState: initialCounterState,

  // Reducers
  reducers: {

    // Increment Counter
    increment(state) {
      state.counter++;
    },



    // Decrement Counter
    decrement(state) {
      state.counter--;
    },



    // Increase Counter using Payload
    //
    // action.payload stores dispatched value

    increase(state, action) {

      state.counter = state.counter + action.payload;

    },



    // Toggle Counter Visibility

    toggleCounter(state) {

      state.showCounter = !state.showCounter;

    },
  },
});



// ============================================================
// EXPORTING ACTIONS
// ============================================================

// Auto-generated Redux Toolkit actions

export const counterActions = counterSlice.actions;



// ============================================================
// EXPORTING REDUCER
// ============================================================

// Exporting reducer separately

export default counterSlice.reducer;