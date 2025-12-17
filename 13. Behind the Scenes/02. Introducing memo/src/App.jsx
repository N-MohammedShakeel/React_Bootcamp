import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";

function App() {
  // Root component render
  // Any state update here normally causes ALL child components to re-run
  log("<App /> rendered");

  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event) {
    // Updates state → App re-renders
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    // Updates state → App re-renders
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <>
      {/* Header re-renders whenever App re-renders */}
      <Header />

      <main>
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>

        {/*
          Counter is memoized.
          → React will ONLY re-run Counter if its props change.
          → Typing in the input will NOT re-render Counter anymore.
        */}
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
