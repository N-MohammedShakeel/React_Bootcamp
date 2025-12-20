import Input from "./Input.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

export default function Login() {
  /*
    ------------------------------------------------------------
    USING useInput FOR MODULAR, SCALABLE FORMS
    ------------------------------------------------------------

    Each input field now:
    - Has its own isolated state
    - Has its own validation logic
    - Uses the same reusable hook

    The component focuses ONLY on:
    - Wiring inputs together
    - Handling submission
  */

  /*
    Email input logic:
    - Default value: empty string
    - Validation rule: must be a valid, non-empty email
  */
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  /*
    Password input logic:
    - Default value: empty string
    - Validation rule: minimum length of 6
  */
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();

    /*
      Final validation gate:
      ----------------------
      Even though validation happens during input,
      we always re-check before submission.
      This prevents invalid data from being submitted.
    */
    if (emailHasError || passwordHasError) {
      return;
    }

    // Valid, sanitized input values
    console.log(emailValue, passwordValue);
  }

  return (
    /*
      Clean JSX thanks to reusable Input + useInput hook.
      No validation logic inside JSX.
    */
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          /*
            Error message driven by hook state.
          */
          error={emailHasError && "Please enter a valid email!"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password!"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
