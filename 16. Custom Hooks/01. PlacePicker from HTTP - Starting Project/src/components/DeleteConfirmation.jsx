import { useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000; // auto-confirm after 3 seconds

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    // Start timer when component mounts
    const timer = setTimeout(() => {
      onConfirm(); // auto-confirm deletion
    }, TIMER);

    // Cleanup function: clears timer if component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]); // depends on onConfirm reference

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

      {/* Visual countdown */}
      <ProgressBar timer={TIMER} />
    </div>
  );
}
