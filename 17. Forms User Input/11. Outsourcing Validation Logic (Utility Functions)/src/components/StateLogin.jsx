import { useState } from "react";

import Input from "./Input.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";

export default function Login() {
  /*
    ------------------------------------------------------------
    OUTSOURCING VALIDATION LOGIC IN PRACTICE
    ------------------------------------------------------------

    This component:
    - Manages form state
    - Decides WHEN to validate
    - Delegates HOW to validate to utility functions

    This separation follows the principle:
    "Components handle behavior, utilities handle rules"
  */

  /*
    Stores current input values.
  */
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  /*
    Tracks whether the user has interacted with each field.
    Used to control when validation messages appear.
  */
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  /*
    DERIVED VALIDATION STATES
    ------------------------
    These values are calculated on every render.

    Validation logic is now READABLE and EXPRESSIVE
    because the rules are named functions.
  */

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);

  /*
    Password is invalid only if:
    - User interacted with the field
    - AND password length is less than required
  */
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleSubmit(event) {
    event.preventDefault();

    // All validation rules already evaluated by this point
    console.log(enteredValues);
  }

  /*
    Handles input value changes.
    Validation rules are NOT here — only state updates.
  */
  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    /*
      Reset didEdit while typing to hide errors
      until user finishes editing again.
    */
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  /*
    Marks field as edited when user leaves it.
    Enables validation feedback.
  */
  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  return (
    /*
      Controlled form with:
      - Reusable Input components
      - Centralized validation utilities
      - Clean and maintainable structure
    */
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur("email")}
          onChange={(event) => handleInputChange("email", event.target.value)}
          value={enteredValues.email}
          /*
            Error message is derived from
            outsourced validation logic.
          */
          error={emailIsInvalid && "Please enter a valid email!"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          onBlur={() => handleInputBlur("password")}
          value={enteredValues.password}
          error={passwordIsInvalid && "Please enter a valid password!"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
