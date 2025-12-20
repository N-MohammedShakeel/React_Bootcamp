import { useState } from "react";

export default function Login() {
  /*
    ------------------------------------------------------------
    STATE-BASED INPUT MANAGEMENT WITH LIVE VALIDATION
    ------------------------------------------------------------

    In this approach:
    - Inputs are CONTROLLED by React state
    - Every keystroke updates state
    - Validation runs automatically on each render

    This allows:
    - Immediate user feedback
    - Conditional error messages
    - Dynamic UI behavior
  */

  /*
    Single state object holding all form input values.
    Centralizing values simplifies validation logic.
  */
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  /*
    DERIVED VALIDATION STATE
    -----------------------
    This value is NOT stored in state.

    Why?
    ----
    - It can be derived from existing state
    - Storing it would cause redundant state
    - React automatically recalculates it on every render

    Validation rule:
    - Only show error AFTER the user starts typing
    - Email must include '@'
  */
  const emailIsInvalid =
    enteredValues.email !== "" && !enteredValues.email.includes("@");

  function handleSubmit(event) {
    event.preventDefault();

    // At submit time, enteredValues contains the latest user input
    console.log(enteredValues);
  }

  /*
    Generic change handler for all inputs.

    identifier:
      - Identifies which field is being updated

    value:
      - Current input value from the event
  */
  function handleInputChange(identifier, value) {
    /*
      Functional state update is used because:
      - State updates are asynchronous
      - We rely on the previous state snapshot

      The spread operator ensures that:
      - Other input values are preserved
    */
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  /*
    BELOW: Alternative approach using individual state variables
    (Commented out for learning comparison)
  */

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  return (
    /*
      CONTROLLED FORM:
      - Input values come from React state
      - Validation logic runs on every keystroke
      - UI stays in sync with data at all times
    */
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>

          {/*
            onChange:
              - Updates state on each keystroke
              - Triggers re-render
              - Re-evaluates validation logic
          */}
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
          />

          {/*
            Conditional error rendering:
            - Error appears only when validation fails
            - Updates immediately as user types
          */}
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        {/*
          Reset button:
          - Clears browser UI
          - Does NOT reset React state
          - Requires manual state reset for full reset
        */}
        <button className="button button-flat">Reset</button>

        <button className="button">Login</button>
      </p>
    </form>
  );
}
