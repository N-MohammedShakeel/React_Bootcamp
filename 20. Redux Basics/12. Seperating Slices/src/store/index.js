// ============================================================
// REDUX STORE CONFIGURATION
// ============================================================

// configureStore()
// -> Modern Redux store creation method
//
// Benefits:
// ✅ Cleaner configuration
// ✅ Built-in DevTools
// ✅ Middleware support
// ✅ Better scalability

import { configureStore } from '@reduxjs/toolkit';



// ============================================================
// IMPORTING REDUCERS
// ============================================================

// Importing reducers from separate slice files

import counterReducer from './counter';

import authReducer from './auth';



// ============================================================
// CONFIGURING STORE
// ============================================================

// Combining multiple reducers
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
    counter: counterReducer,

    // Authentication Slice Reducer
    auth: authReducer,

  },

});



// ============================================================
// WHY SEPARATE FILES?
// ============================================================

/*

Separating slices into individual files provides:

✅ Better project structure
✅ Easier maintenance
✅ Cleaner codebase
✅ Feature-based architecture
✅ Scalability for large applications



COMMON FOLDER STRUCTURE
------------------------

store/
│
├── index.js
├── auth.js
├── counter.js
├── cart.js
└── product.js



BEST PRACTICE
--------------

Each major feature should have:
- Separate slice file
- Separate reducers
- Separate actions

This is standard enterprise-level Redux architecture.

*/



// Exporting Redux Store

export default store;