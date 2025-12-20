import { useState } from "react";

import Input from "./Input.jsx";

export default function Login() {
  /*
    ------------------------------------------------------------
    USING A REUSABLE INPUT COMPONENT
    ------------------------------------------------------------

    This form now:
    - Uses controlled inputs
    - Centralizes validation logic in Login
    - Delegates rendering to Input component

    Result:
    -------
    - Cleaner JSX
    - Better separation of concerns
    - Easier to maintain and scale
  */

  /*
    Single state object to store form values.
  */
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  /*
    Tracks whether user has interacted with each input.
    Used to control when validation messages appear.
  */
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  /*
    Derived validation states.
    These are recalculated on every render.
  */
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  const passwordIsInvalid =
    didEdit.password && enteredValues.password.trim().length < 6;

  function handleSubmit(event) {
    event.preventDefault();

    // Final validated values available here
    console.log(enteredValues);
  }

  /*
    Handles input value changes for ALL fields.
  */
  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    /*
      Reset didEdit while typing
      so errors disappear as user corrects input.
    */
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  /*
    Marks field as edited once user leaves it.
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
      Controlled form using reusable input components.
    */
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          /*
            Event handlers passed down to Input
            and forwarded to <input> via {...props}
          */
          onBlur={() => handleInputBlur("email")}
          onChange={(event) => handleInputChange("email", event.target.value)}
          value={enteredValues.email}
          /*
            Error message is computed in Login
            and passed as plain data.
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
