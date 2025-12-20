/*
  ============================================================
  VALIDATION UTILITY FUNCTIONS (OUTSOURCED LOGIC)
  ============================================================

  PURPOSE:
  --------
  These functions contain PURE validation logic.
  They are completely independent of React.

  Benefits of outsourcing validation:
  -----------------------------------
  - Reusable across multiple components and forms
  - Easier to test (plain JavaScript functions)
  - Keeps components clean and focused on UI + state
  - Central place to update validation rules
*/

/*
  Checks whether a value looks like an email.
  NOTE:
  -----
  This is a simple validation rule.
  More complex patterns (regex) can be added later
  without changing component code.
*/
export function isEmail(value) {
  return value.includes("@");
}

/*
  Checks whether a value is not empty or whitespace.
*/
export function isNotEmpty(value) {
  return value.trim() !== "";
}

/*
  Ensures a value has at least the given minimum length.
*/
export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

/*
  Compares two values for equality.
  Useful for confirm-password scenarios.
*/
export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
