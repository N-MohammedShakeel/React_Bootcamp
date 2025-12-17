import { useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000;

/*
  =================================================
  STATE UPDATE OPTIMIZATION — CORE IDEA
  =================================================

  Earlier approach:
  - Timer + progress state lived in THIS component
  - Frequent state updates caused this entire component
    (buttons, text, layout) to re-render every 10ms

  Optimized approach:
  - Keep ONLY business logic here (auto-confirm)
  - Move high-frequency UI updates into a child component
*/

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  /*
    =================================================
    EFFECT — AUTO CONFIRM (Business Logic)
    =================================================

    - Runs once when component mounts
    - Calls onConfirm after TIMER duration
    - Cleaned up if component unmounts early
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    /*
      Cleanup:
      - Prevents auto-confirm if user cancels
      - Runs on unmount
    */
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

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

      {/*
        ProgressBar handles its OWN state updates.
        Frequent updates are isolated to this component only.
      */}
      <ProgressBar timer={TIMER} />
    </div>
  );
}
