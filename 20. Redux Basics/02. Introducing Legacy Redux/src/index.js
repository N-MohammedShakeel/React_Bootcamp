// ============================================================
// APPLICATION ENTRY FILE
// ============================================================

// React
// -> Core library for building UI

import React from "react";

// ReactDOM
// -> Responsible for rendering React app
// into browser DOM

import ReactDOM from "react-dom/client";

// Provider
// -> Component from react-redux
//
// Professional Definition:
// Provider makes the Redux Store available
// to all React components in the application.
//
// Without Provider:
// useSelector() and useDispatch()
// will NOT work.

import { Provider } from "react-redux";

// Global CSS File
import "./index.css";

// Root App Component
import App from "./App";

// Redux Store
// Imported from store configuration file
import store from "./store/index";

// ============================================================
// CREATING ROOT
// ============================================================

// createRoot()
// -> Creates React root for rendering app

const root = ReactDOM.createRoot(document.getElementById("root"));

// ============================================================
// RENDERING APPLICATION
// ============================================================

// Provider wraps entire application
// This gives ALL components access to:
// ✅ Redux Store
// ✅ useSelector()
// ✅ useDispatch()

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// ============================================================
// REDUX FLOW
// ============================================================

/*

Provider
   ↓
Entire React App gets Store Access
   ↓
Components use:
   - useSelector()
   - useDispatch()
   ↓
Redux Store Updates
   ↓
UI Re-renders Automatically

*/
