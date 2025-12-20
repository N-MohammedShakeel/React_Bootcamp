import { useRef, useState } from "react";

export default function Login() {
  /*
    ------------------------------------------------------------
    VALIDATING USER INPUT ON SUBMISSION (REF-BASED)
    ------------------------------------------------------------

    This approach combines:
    - UNCONTROLLED inputs (using refs)
    - VALIDATION only when the form is submitted

    Key idea:
    ---------
    - Input values are NOT tracked on every keystroke
    - Values are read only once, at submit time
    - Validation happens once, just before sending data
  */

  /*
    Even though inputs are uncontrolled,
    we still need React state for UI feedback.

    emailIsInvalid controls:
    - Whether an error message should be shown
    - A re-render when validation fails
  */
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  /*
    Refs to access the actual DOM input elements.
    React does not manage their values.
  */
  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    /*
      Read values directly from the DOM
      at the moment of submission.
    */
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    /*
      Validation logic executed ONLY on submit.

      This avoids:
      - Validation on every keystroke
      - Unnecessary re-renders
    */
    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      /*
        We set state ONLY to trigger UI feedback.
        The input value itself remains browser-managed.
      */
      setEmailIsInvalid(true);

      // Stop submission if validation fails
      return;
    }

    // Clear error state if validation succeeds
    setEmailIsInvalid(false);

    /*
      At this point:
      - Input values are valid
      - Data can be sent to backend
    */
    console.log("Sending HTTP request...");
  }

  return (
    /*
      UNCONTROLLED FORM WITH SUBMIT-TIME VALIDATION:

      - Inputs store values in the DOM
      - Refs read values on submit
      - State is used ONLY for validation feedback
    */
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>

          {/*
            ref={email}:
            - Gives access to the DOM input element
            - No value or onChange needed
          */}
          <input id="email" type="email" name="email" ref={email} />

          {/*
            Error message:
            - Rendered only if validation fails
            - Controlled by React state
          */}
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>

          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        {/*
          Reset button:
          - Clears browser-managed inputs
          - Automatically works with uncontrolled inputs
        */}
        <button className="button button-flat">Reset</button>

        {/*
          Submit button:
          - Triggers validation logic
          - Reads values via refs
        */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}
