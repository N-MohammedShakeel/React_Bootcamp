import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";

function App() {
  // Root render → triggers render of entire component tree
  log("<App /> rendered");

  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event) {
    // Controlled input → state syncs UI
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    // Updating state → re-render App
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <>
      <Header />

      <main>
        <section id="configure-counter">
          <h2>Set Counter</h2>

          {/* Controlled input */}
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>

        {/* New props → Counter re-renders */}
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
