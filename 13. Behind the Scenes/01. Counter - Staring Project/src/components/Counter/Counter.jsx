import { useState } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

/*
  Pure helper function (NOT a React component)
  - Runs every time Counter renders
  - Used to demonstrate that normal JS logic
    re-executes on each render
*/
function isPrime(number) {
  log("Calculating if is prime number", 2, "other");

  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

export default function Counter({ initialCount }) {
  // Logged EVERY time this component function executes
  log("<Counter /> rendered", 1);

  // Runs during render → recalculated on every render
  const initialCountIsPrime = isPrime(initialCount);

  /*
    React state:
    - Stored internally by React
    - Preserved between renders
    - Changing it triggers a re-render
  */
  const [counter, setCounter] = useState(initialCount);

  function handleDecrement() {
    // React schedules a state update → re-render
    setCounter((prevCounter) => prevCounter - 1);
  }

  function handleIncrement() {
    // React schedules a state update → re-render
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <section className="counter">
      {/* Derived UI from props + calculations */}
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>

      {/* Event handlers cause state updates → re-render */}
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>

        {/* Child component receives state as props */}
        <CounterOutput value={counter} />

        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
}
