import { styled } from "styled-components";

// Styled button component
const Button = styled.button`
  padding: 1rem 2rem; /* Button spacing */
  font-weight: 600; /* Bold text */
  text-transform: uppercase; /* Uppercase label */
  color: #1f2937; /* Text color */
  background-color: #f0b322; /* Default background */
  border: none; /* Remove border */
  border-radius: 6px; /* Rounded corners */

  &:hover {
    background-color: #f0920e; /* Hover color */
  }
`;

export default Button;
