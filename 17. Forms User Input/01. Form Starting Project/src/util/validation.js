/*
  ============================================================
  VALIDATION UTILITY FUNCTIONS
  ============================================================

  These functions:
  - Contain PURE logic (no React, no state)
  - Can be reused across multiple forms
  - Help keep components clean and readable
*/

/*
  Checks whether the input value looks like an email.
  This is a BASIC check, not a full RFC-compliant validation.
*/
export function isEmail(value) {
  return value.includes("@");
}

/*
  Ensures the input is not empty or only whitespace.
  trim() removes spaces before checking.
*/
export function isNotEmpty(value) {
  return value.trim() !== "";
}

/*
  Checks whether a value has at least a certain length.
  Useful for password or username validation.
*/
export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

/*
  Compares two values for equality.
  Commonly used for:
  - Confirm password fields
  - Re-enter email checks
*/
export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
