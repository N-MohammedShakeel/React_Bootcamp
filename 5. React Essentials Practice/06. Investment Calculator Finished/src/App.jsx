import { useState } from "react";

import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";

function App() {
  // **State Management**
  // - `userInput` stores investment data, initialized with default values.
  // - Single source of truth for input fields and results calculation.
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  // **Input Validation**
  // - Checks if `duration` is at least 1 to ensure valid results.
  // - Prevents rendering `Results` if input is invalid, showing an error instead.
  const inputIsValid = userInput.duration >= 1;

  // **Immutable State Update**
  // - Updates `userInput` immutably using spread operator and dynamic key.
  // - Converts `newValue` to number with `+` for calculations.
  // - **Why Immutable?** Ensures React detects changes and triggers re-renders reliably.
  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  return (
    // **Fragment for Clean DOM**
    // - Uses `<></>` to group elements without extra DOM nodes.
    <>
      <Header />
      {/* **Passing State and Handler**
          - Passes `userInput` and `handleChange` to sync inputs with state. */}
      <UserInput userInput={userInput} onChange={handleChange} />
      {/* **Conditional Rendering**
          - Shows error if `inputIsValid` is false.
          - Renders `Results` only if `inputIsValid` is true, passing `userInput`. */}
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <Results input={userInput} />}
    </>
  );
}

export default App;
