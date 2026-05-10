// ============================================================
// AUTH SLICE
// ============================================================

// createSlice()
// -> Creates Redux slice containing:
//    ✅ State
//    ✅ Reducers
//    ✅ Actions
//    ✅ Action Types

import { createSlice } from '@reduxjs/toolkit';



// ============================================================
// INITIAL AUTH STATE
// ============================================================

// Authentication-related default state

const initialAuthState = {
  isAuthenticated: false,
};



// ============================================================
// AUTHENTICATION SLICE
// ============================================================

// Handles authentication-related logic
//
// Slice Name:
// authentication
//
// State Path in Store:
// state.auth

const authSlice = createSlice({

  // Unique slice name
  name: 'authentication',

  // Initial state for auth feature
  initialState: initialAuthState,

  // Reducer methods
  reducers: {

    // LOGIN ACTION
    //
    // Sets authentication status to true

    login(state) {
      state.isAuthenticated = true;
    },



    // LOGOUT ACTION
    //
    // Sets authentication status to false

    logout(state) {
      state.isAuthenticated = false;
    },
  },
});



// ============================================================
// EXPORTING ACTIONS
// ============================================================

// Auto-generated action creators
//
// Usage:
// dispatch(authActions.login())

export const authActions = authSlice.actions;



// ============================================================
// EXPORTING REDUCER
// ============================================================

// Exporting reducer separately
//
// This reducer will later be added
// inside configureStore()

export default authSlice.reducer;