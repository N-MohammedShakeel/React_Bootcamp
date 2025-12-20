import { useState } from "react";

export default function Login() {
  /*
    ------------------------------------------------------------
    MANAGING USER INPUT IN REACT
    ------------------------------------------------------------

    There are two common approaches to store form input values:

    1) MULTIPLE STATE VARIABLES
       ------------------------
       Example:
         const [enteredEmail, setEnteredEmail] = useState('');
         const [enteredPassword, setEnteredPassword] = useState('');

       Pros:
         - Very explicit
         - Easy to understand for small forms

       Cons:
         - Becomes repetitive for large forms
         - Many handlers and state setters

    2) SINGLE STATE OBJECT (USED HERE)
       --------------------------------
       Example:
         const [enteredValues, setEnteredValues] = useState({
           email: '',
           password: '',
         });

       Pros:
         - Centralized form state
         - Scales better for larger forms
         - Easier to reset entire form

       Cons:
         - Requires careful state updates
         - Must always merge previous state
  */

  // Single state object holding all form input values
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  /*
    Handles form submission.
    At this point, enteredValues contains
    the latest user input from all fields.
  */
  function handleSubmit(event) {
    event.preventDefault();

    // Collected user input is available here
    console.log(enteredValues);
  }

  /*
    Generic input change handler.

    identifier:
      - Tells which field is being updated (email / password)

    value:
      - New value entered by the user

    This approach avoids creating
    separate change handlers for every input field.
  */
  function handleInputChange(identifier, value) {
    /*
      Functional state update is REQUIRED here
      because:
      - State updates are asynchronous
      - We are updating based on previous state

      We spread prevValues to avoid
      accidentally removing other fields.
    */
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value, // dynamically update the correct field
    }));
  }

  /*
    BELOW: Alternative approach using multiple state variables
    (Commented out for comparison and learning purposes)
  */

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  return (
    /*
      This is now a CONTROLLED FORM.

      Controlled means:
      - Input value comes from React state
      - React is the single source of truth
      - Every change updates state
    */
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>

          {/*
            onChange:
              - Fires on every keystroke
              - Updates React state

            value:
              - Binds input to React state
              - Prevents uncontrolled behavior
          */}
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
          />
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
          - Currently only resets the browser UI
          - Does NOT reset React state
          - Requires manual state reset to fully clear inputs
        */}
        <button className="button button-flat">Reset</button>

        <button className="button">Login</button>
      </p>
    </form>
  );
}
