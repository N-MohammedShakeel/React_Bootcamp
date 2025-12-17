import { useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  /*
    =================================================
    FUNCTION DEPENDENCY PROBLEM
    =================================================

    useEffect depends on onConfirm.

    If onConfirm reference changes:
    - Effect cleans up
    - Timer resets
    - Auto-confirm may never fire
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    /*
      Cleanup ensures:
      - Timer is cleared on unmount
      - Timer resets only when onConfirm truly changes
    */
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]); // Function dependency → requires stable reference

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>

      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
