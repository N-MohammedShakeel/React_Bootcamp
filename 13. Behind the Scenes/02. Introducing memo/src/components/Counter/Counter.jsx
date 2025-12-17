import { useState, memo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

/*
  Regular helper function
  - Runs ONLY when Counter actually renders
  - Memo prevents unnecessary executions
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

/*
  React.memo
  =================================================
  What memo does:
  - Wraps a component
  - Compares incoming props with previous props
  - Skips re-executing the component if props are the SAME

  Important:
  - memo does NOT block re-renders caused by THIS component's own state
  - It ONLY blocks re-renders caused by PARENT re-renders
*/
const Counter = memo(function Counter({ initialCount }) {
  // This log will NOT run if App re-renders
  // AND initialCount did NOT change
  log("<Counter /> rendered", 1);

  // Expensive calculation → avoided if memo skips render
  const initialCountIsPrime = isPrime(initialCount);

  /*
    Local state:
    - Still works normally
    - Updating this state WILL re-render Counter
    - memo does NOT interfere with internal state updates
  */
  const [counter, setCounter] = useState(initialCount);

  function handleDecrement() {
    // Local state update → Counter re-renders
    setCounter((prevCounter) => prevCounter - 1);
  }

  function handleIncrement() {
    // Local state update → Counter re-renders
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>

      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>

        <CounterOutput value={counter} />

        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;
