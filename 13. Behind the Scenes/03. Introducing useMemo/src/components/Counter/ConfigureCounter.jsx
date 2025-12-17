import { useState } from "react";
import { log } from "../../log.js";

/*
  ConfigureCounter
  =================
  Purpose:
  - Handles ONLY user input & configuration
  - Owns its local input state
  - Communicates upward via a callback (onSet)

  Benefit:
  - Keeps App and Counter simpler
  - Limits re-renders to where they are actually needed
*/
export default function ConfigureCounter({ onSet }) {
  log("<ConfigureCounter />", 1);

  // Local state → isolated from App & Counter
  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    // Calls parent-provided function
    onSet(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
}
