import { useState } from "react";

/*
  ============================================================
  CUSTOM HOOK: useInput
  ============================================================

  PURPOSE:
  --------
  This hook encapsulates ALL logic related to a single form input:
    - value management
    - validation
    - "touched / edited" state
    - change and blur handlers

  This removes duplication across components and inputs.

  PARAMETERS:
  -----------
  defaultValue:
    - Initial value for the input

  validationFn:
    - A function that receives the current value
    - Must return true (valid) or false (invalid)
    - Allows fully custom, reusable validation rules
*/

export function useInput(defaultValue, validationFn) {
  /*
    Stores the current input value.
    This makes the input a controlled input.
  */
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  /*
    Tracks whether the user has interacted with the input
    and left it (onBlur).
    Used to decide WHEN to show validation errors.
  */
  const [didEdit, setDidEdit] = useState(false);

  /*
    VALIDATION RESULT (DERIVED STATE)
    --------------------------------
    - validationFn is executed on every render
    - Result is derived from enteredValue
    - No extra state is needed
  */
  const valueIsValid = validationFn(enteredValue);

  /*
    Handles change events (onChange).
    - Updates the value
    - Resets didEdit so errors disappear while typing
  */
  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  /*
    Handles blur events (onBlur).
    - Marks the field as edited
    - Enables validation feedback
  */
  function handleInputBlur() {
    setDidEdit(true);
  }

  /*
    Returned API of the hook.

    hasError:
      - true only if:
          * user interacted with input
          * AND value is invalid

    This keeps error logic consistent across inputs.
  */
  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
