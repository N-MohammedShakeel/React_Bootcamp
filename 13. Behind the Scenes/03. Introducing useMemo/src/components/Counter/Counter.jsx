import { useState, memo, useCallback, useMemo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

/*
  Expensive calculation
  - Pure function
  - Re-running unnecessarily would be wasteful
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
  Counter (memoized)
  ==================
  memo:
  - Prevents re-execution when props do not change
  - Parent re-renders alone are NOT enough anymore
*/
const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  /*
    useMemo
    -------
    Purpose:
    - Cache the RESULT of a calculation
    - Recalculate ONLY when dependencies change

    Here:
    - isPrime(initialCount) runs ONLY when initialCount changes
    - Skipped on every other re-render
  */
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  // Local counter state
  const [counter, setCounter] = useState(initialCount);

  /*
    useCallback
    -----------
    Purpose:
    - Cache FUNCTION references
    - Prevent new function objects on every render

    Why needed:
    - These functions are passed to memoized child components
    - Stable reference = child can skip re-render
  */
  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

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
