import { styled } from "styled-components";

// Label with dynamic color when invalid
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  /* Red if invalid, gray if valid */
  color: ${({ $invalid }) => ($invalid ? "#f87171" : "#6b7280")};
`;

// Input with dynamic background, text, and border on invalid
const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;

  /* Background changes based on invalid */
  background-color: ${({ $invalid }) => ($invalid ? "#fed2d2" : "#d1d5db")};

  /* Text color changes */
  color: ${({ $invalid }) => ($invalid ? "#ef4444" : "#374151")};

  /* Border changes */
  border: 1px solid ${({ $invalid }) => ($invalid ? "#f73f3f" : "transparent")};

  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
`;

export default function CustomInput({ label, invalid, ...props }) {
  return (
    <p>
      {/* Pass invalid state to styled components */}
      <Label $invalid={invalid}>{label}</Label>
      <Input $invalid={invalid} {...props} />
    </p>
  );
}
