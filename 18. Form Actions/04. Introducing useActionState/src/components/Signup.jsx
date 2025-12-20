import { useActionState } from "react";

import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from "../util/validation";

export default function Signup() {
  /*
    ============================================================
    useActionState — COMPLETE PICTURE (IMPORTANT)
    ============================================================

    useActionState is a React 19+ hook used to bind:
      - a form action
      - the state returned by that action
      - the form submission lifecycle

    FULL SYNTAX:
    ------------
    const [state, action, isPending] = useActionState(
      actionFn,
      initialState
    );

    In this file, we are using ONLY:
      - state
      - action

    BUT React ALSO PROVIDES:
      - isPending (boolean)

    isPending becomes true:
      - when the action is currently running
      - during async submissions
      - useful for disabling buttons / showing loaders
  */

  /*
    ------------------------------------------------------------
    ACTION FUNCTION — SIGNATURE CHANGE
    ------------------------------------------------------------

    WITHOUT useActionState:
      function signupAction(formData) { ... }

    WITH useActionState:
      function signupAction(prevFormState, formData) { ... }

    WHY THIS CHANGE?
    ----------------
    Because React now manages action state internally.

    React needs:
      - previous state (prevFormState)
      - new submission data (formData)

    So the action becomes a STATE TRANSITION function.
  */
  function signupAction(prevFormState, formData) {
    /*
      prevFormState:
      --------------
      - The last state returned from this action
      - Comes from useActionState
      - Not required in this example
      - Useful for merging or preserving data across submissions
    */

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const role = formData.get("role");
    const terms = formData.get("terms");
    const acquisitionChannel = formData.getAll("acquisition");

    let errors = [];

    // Standard validation logic (already known)
    if (!isEmail(email)) {
      errors.push("Invalid email address.");
    }

    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push("You must provide a password with at least six characters.");
    }

    if (!isEqualToOtherValue(password, confirmPassword)) {
      errors.push("Passwords do not match.");
    }

    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
      errors.push("Please provide both your first and last name.");
    }

    if (!isNotEmpty(role)) {
      errors.push("Please select a role.");
    }

    if (!terms) {
      errors.push("You must agree to the terms and conditions.");
    }

    if (acquisitionChannel.length === 0) {
      errors.push("Please select at least one acquisition channel.");
    }

    /*
      RETURN VALUE = NEW FORM STATE
      -----------------------------

      Whatever is returned here becomes:
        - the new `formState`
        - accessible immediately in the component

      This replaces manual setState calls.
    */
    if (errors.length > 0) {
      return { errors };
    }

    return { errors: null };
  }

  /*
    ------------------------------------------------------------
    useActionState — DESTRUCTURING
    ------------------------------------------------------------

    FULL VERSION (NOT USED HERE):
      const [formState, formAction, isPending] =
        useActionState(signupAction, initialState);

    CURRENT VERSION:
      const [formState, formAction] = ...

    WHY isPending IS NOT USED HERE:
    -------------------------------
    - signupAction is synchronous
    - no async request
    - no loading state required

    Still important to KNOW it exists.
  */
  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  return (
    /*
      ------------------------------------------------------------
      FORM action ATTRIBUTE — FINAL CHANGE
      ------------------------------------------------------------

      OLD:
        <form action={signupAction}>

      NEW (with useActionState):
        <form action={formAction}>

      formAction is:
        - a wrapped version of signupAction
        - connected to React state updates
        - aware of pending / completed state
    */
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="role">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {/*
        formState is ALWAYS the last returned value
        from signupAction.

        React automatically re-renders when it changes.
      */}
      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>

        {/*
          If isPending were used, this is where:
            - button could be disabled
            - text could change to "Submitting..."
        */}
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
