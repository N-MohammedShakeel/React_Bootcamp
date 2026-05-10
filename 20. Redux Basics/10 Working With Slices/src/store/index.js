// ============================================================
// REDUX TOOLKIT - WORKING WITH MULTIPLE SLICES
// ============================================================

// Slice:
// A small section of Redux state and logic
// dedicated to a specific feature.
//
// Benefits of Slices:
// ✅ Better code organization
// ✅ Scalable architecture
// ✅ Separation of concerns
// ✅ Easier maintenance
//
// Real-world Examples:
// - Auth Slice
// - Cart Slice
// - Product Slice
// - Theme Slice

import { createSlice, configureStore } from '@reduxjs/toolkit';



// ============================================================
// COUNTER SLICE
// ============================================================

// Initial state for counter feature

const initialCounterState = {
  counter: 0,
  showCounter: true
};

// createSlice()
// -> Automatically creates:
//    1. Reducers
//    2. Actions
//    3. Action Types

const counterSlice = createSlice({

  // Unique slice name
  name: 'counter',

  // Initial slice state
  initialState: initialCounterState,

  // Reducer methods
  reducers: {

    // Increment Counter
    increment(state) {
      state.counter++;
    },

    // Decrement Counter
    decrement(state) {
      state.counter--;
    },

    // Increase Counter using payload
    //
    // action.payload stores dispatched data
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
// AUTHENTICATION SLICE
// ============================================================

// Authentication state

const initialAuthState = {
  isAuthenticated: false,
};

// Authentication slice handles
// authentication-related logic

const authSlice = createSlice({

  name: 'authentication',

  initialState: initialAuthState,

  reducers: {

    // Login Reducer
    login(state) {
      state.isAuthenticated = true;
    },

    // Logout Reducer
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});



// ============================================================
// CONFIGURING STORE
// ============================================================

// configureStore()
// -> Combines multiple slice reducers
//
// Final Redux State Structure:
//
// {
//    counter: {
//       counter: 0,
//       showCounter: true
//    },
//
//    auth: {
//       isAuthenticated: false
//    }
// }

const store = configureStore({

  reducer: {

    // Counter Slice Reducer
    counter: counterSlice.reducer,

    // Auth Slice Reducer
    auth: authSlice.reducer,

  },

});



// ============================================================
// EXPORTING ACTIONS
// ============================================================

// createSlice() automatically generates
// action creator functions

export const counterActions = counterSlice.actions;

export const authActions = authSlice.actions;



// ============================================================
// EXPORTING STORE
// ============================================================

export default store;