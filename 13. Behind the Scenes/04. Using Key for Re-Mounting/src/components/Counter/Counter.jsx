import { useState, memo, useCallback, useMemo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";
import CounterHistory from "./CounterHistory.jsx";

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

const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  /*
    IMPORTANT DESIGN CHANGE
    =======================
    Instead of a single number state,
    we store ALL counter changes as an array.

    This allows:
    - tracking history
    - demonstrating how keys affect child components
  */

  /*
    ❌ OLD APPROACH (commented out)
    Needed useEffect to reset state when initialCount changed.
    This mixes synchronization logic into the component.
  */
  // useEffect(() => {
  //   setCounterChanges([{ value: initialCount, id: Math.random() * 1000 }]);
  // }, [initialCount]);

  /*
    ✅ NEW APPROACH
    Initial state is derived ONCE during mount.
    Remounting the component will reset the state automatically.
  */
  const [counterChanges, setCounterChanges] = useState([
    { value: initialCount, id: Math.random() * 1000 },
  ]);

  /*
    Derived state:
    - Calculated during render
    - No extra state needed
  */
  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(() => {
    /*
      New history entry added at the top.

      CRITICAL DETAIL:
      - Each entry gets a UNIQUE, STABLE id
      - This id is later used as a React key
    */
    setCounterChanges((prev) => [
      { value: -1, id: Math.random() * 1000 },
      ...prev,
    ]);
  }, []);

  const handleIncrement = useCallback(() => {
    setCounterChanges((prev) => [
      { value: 1, id: Math.random() * 1000 },
      ...prev,
    ]);
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

        <CounterOutput value={currentCounter} />

        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>

      {/* History rendering exposes key-related bugs clearly */}
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;
