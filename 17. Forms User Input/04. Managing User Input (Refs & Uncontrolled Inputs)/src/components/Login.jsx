import { useRef } from "react";

export default function Login() {
  /*
    ------------------------------------------------------------
    MANAGING USER INPUT USING REFS
    ------------------------------------------------------------

    In this approach, we DO NOT store input values in React state.

    Instead:
    - We let the browser manage the input values
    - We access the values directly from the DOM using refs
    - React only reads the values when needed (on submit)

    This creates an UNCONTROLLED form.
  */

  /*
    email and password refs will hold references
    to the actual DOM <input> elements.
  */
  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    /*
      email.current and password.current point to
      the DOM nodes created by React.

      .value accesses the current input value
      directly from the browser.
    */
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    // Values are read only at submission time
    console.log(enteredEmail, enteredPassword);
  }

  return (
    /*
      This is an UNCONTROLLED form because:
      - Input values are not stored in React state
      - React does not re-render on every keystroke
      - Values live inside the DOM until accessed
    */
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>

          {/*
            ref={email}:
            - Connects the input element to the email ref
            - React assigns the DOM element to email.current
            - Allows direct DOM access
          */}
          <input id="email" type="email" name="email" ref={email} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>

          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        {/*
          Reset button:
          - Resets the browser-managed input values
          - Works automatically with uncontrolled inputs
          - No React state reset required
        */}
        <button className="button button-flat">Reset</button>

        {/*
          Submit button:
          - Triggers form submission
          - Values are read from refs in handleSubmit
        */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}
