import { useEffect } from "react";

/*
  =================================================
  AUTO-CLOSE CONFIRMATION — useEffect USE CASE
  =================================================

  Goal:
  - Automatically confirm deletion after 3 seconds
  - Cancel the timer if:
    ✔ user clicks "No"
    ✔ modal closes
    ✔ component unmounts

  Why useEffect?
  - Timers are side effects
  - They must be started AFTER render
  - They must be cleaned up to avoid bugs
*/

/*
  =================================================
  useEffect LIFECYCLE — MOUNT & UNMOUNT
  =================================================

  Important mental model:

  1. Component MOUNTS
     → JSX renders
     → useEffect callback runs

  2. Component stays mounted
     → timer is active

  3. Component UNMOUNTS
     (because modal closes or conditional rendering changes)
     → React calls the CLEANUP function

  Key rule:
  → React does NOT wait for setTimeout to finish
  → Cleanup runs IMMEDIATELY when component unmounts
*/

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    // Side effect: start a timer AFTER component mounts
    const timer = setTimeout(() => {
      onConfirm(); // auto-confirm after 3 seconds
    }, 3000);

    /*
      CLEANUP FUNCTION

        When does this run?
      - When component unmounts
      - When dependency changes (not in this case)
      - BEFORE the effect runs again

      Even if the timer has NOT finished,
      React will still execute this cleanup.

        In this case:
      - Runs before component unmounts
      - Runs before effect re-runs
      - Prevents memory leaks & unwanted execution
    */
    return () => {
      clearTimeout(timer); // stops the pending timeout
    };
  }, []); // Empty dependency → runs once when mounted

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
