import { useState } from "react";

export default function Login() {
  /*
    ------------------------------------------------------------
    VALIDATION ON KEYSTROKE + ON BLUR
    ------------------------------------------------------------

    This pattern combines TWO validation strategies:

    1) onChange (keystroke-based)
       - Keeps state in sync with input
       - Enables real-time validation logic

    2) onBlur (focus-based)
       - Triggers validation only after the user
         leaves the input field
       - Prevents showing errors too early

    Together, this creates a better user experience:
    - No error messages while typing initially
    - Errors appear only after user interaction
  */

  /*
    Stores the current values entered by the user.
    This keeps inputs CONTROLLED by React.
  */
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  /*
    Tracks whether the user has interacted with
    (focused and left) each input field.

    didEdit.email === true
      -> user has left the email field at least once

    This state is used ONLY to control
    WHEN validation messages should be shown.
  */
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  /*
    DERIVED VALIDATION STATE
    -----------------------
    The email is considered invalid only if:
    - The user has interacted with the field (onBlur occurred)
    - AND the email does not include '@'

    This avoids showing validation errors
    before the user finishes typing.
  */
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  function handleSubmit(event) {
    event.preventDefault();

    // Final input values available at submit time
    console.log(enteredValues);
  }

  /*
    Handles input value changes (onChange).

    Responsibilities:
    - Update the input value in state
    - Reset didEdit flag to false while typing
      so validation message disappears as user edits
  */
  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    /*
      Resetting didEdit here ensures that:
      - Validation errors are hidden while the user is typing
      - Errors reappear only after the next blur event
    */
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  /*
    Handles blur event (onBlur).

    onBlur fires when:
    - User clicks outside the input
    - User tabs to another field

    This marks the field as "edited",
    enabling validation feedback.
  */
  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  /*
    BELOW: Alternative approach using separate state variables
    (Commented out for conceptual comparison)
  */

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  return (
    /*
      CONTROLLED FORM WITH USER-FRIENDLY VALIDATION:

      - State updates on every keystroke
      - Validation feedback shown only after blur
      - Cleaner UX than instant error display
    */
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>

          {/*
            onBlur:
              - Marks the input as edited
              - Enables validation message

            onChange:
              - Updates value
              - Hides validation message while typing
          */}
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
          />

          {/*
            Validation message:
            - Rendered only when emailIsInvalid is true
            - Controlled by both value and blur state
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
          - Needs manual reset for full state reset
        */}
        <button className="button button-flat">Reset</button>

        <button className="button">Login</button>
      </p>
    </form>
  );
}
