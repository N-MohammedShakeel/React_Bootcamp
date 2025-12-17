import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  /*
    STATE IN REACT
    ==============
    - State updates DO NOT update immediately
    - React schedules updates for performance
    - Updates are processed during the next render cycle
  */
  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    /*
      STATE SCHEDULING & BATCHING
      ==========================
      These two state updates are:
      - scheduled
      - batched together
      - applied in ONE render

      React batches updates that occur:
      - in the same event
      - in the same tick
    */

    setChosenCount(newCount);

    // Functional update → guaranteed to receive latest scheduled state
    setChosenCount((prevChosenCount) => prevChosenCount + 1);

    /*
      WHY THIS LOG DOES NOT WORK
      =========================
      - chosenCount here is the OLD value
      - state updates are async & scheduled
      - React has NOT re-rendered yet
    */
    console.log(chosenCount); // stale value
  }

  /*
    VIRTUAL DOM (HIGH LEVEL)
    =======================
    1. App re-runs (function execution)
    2. JSX → Virtual DOM tree (lightweight JS objects)
    3. React compares previous VDOM with new VDOM (diffing)
    4. React updates ONLY the necessary real DOM nodes
  */

  /*
    MILLION.JS ROLE
    ===============
    React:
    - Diffing happens at component boundaries
    - Even memoized components still participate in reconciliation

    Million.js:
    - Replaces VDOM diffing with fine-grained DOM instructions
    - Skips component-level reconciliation when possible
    - Generates highly optimized update paths

    Result:
    - Less work per render
    - Faster updates
    - Better scalability for large trees
  */

  return (
    <>
      <Header />

      <main>
        <ConfigureCounter onSet={handleSetCount} />

        {/*
          KEY + MILLION
          =============
          - key forces remount (new component identity)
          - Million optimizes updates INSIDE the component
          - React still controls component lifecycle
        */}
        <Counter key={chosenCount} initialCount={chosenCount} />

        {/* Independent component instance */}
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
