import { useState } from "react";
import { styled } from "styled-components";

import Button from "./Button.jsx";
import Input from "./Input.jsx";

/* Using styled-components:
   - Lets you create React components with scoped CSS.
   - Styles are written in template literals.
   - No class names needed; CSS is attached directly to the component.
   - Prevents style conflicts and improves reusability.
*/
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      {/* Styled component used instead of a normal <div> */}
      <ControlContainer>
        <Input
          label="Email"
          invalid={emailNotValid} // Styled-components inside Input can use this prop for conditional styling
          type="email"
          onChange={(event) => handleInputChange("email", event.target.value)}
        />

        <Input
          label="Password"
          invalid={passwordNotValid} // Avoids inline CSS; logic stays clean
          type="password"
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
      </ControlContainer>

      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>

        {/* Button is also a styled-component */}
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
