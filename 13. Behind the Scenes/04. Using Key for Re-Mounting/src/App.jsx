import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />

        {/*
          KEY ON COUNTER
          ==============
          key={chosenCount}

          What React does:
          - Different key → OLD Counter is UNMOUNTED
          - New Counter instance is MOUNTED
          - All internal state resets automatically

          This eliminates the need for useEffect-based syncing.
        */}
        <Counter key={chosenCount} initialCount={chosenCount} />

        {/* Separate instance → independent state */}
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
