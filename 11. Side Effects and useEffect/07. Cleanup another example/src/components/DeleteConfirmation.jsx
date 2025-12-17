import { useEffect, useState } from "react";

const TIMER = 3000;

/*
  =================================================
  CLEANUP USE CASE — PROGRESS BAR + AUTO CLOSE
  =================================================

  This component demonstrates:
  - Multiple side effects in one component
  - How cleanup works for BOTH interval and timeout
  - How React handles mount & unmount for effects

  We intentionally use TWO useEffect hooks:
  - One for visual updates (progress bar)
  - One for business logic (auto-confirm)

  Rule:
  → One effect = one responsibility
*/

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // Tracks remaining time for the progress bar
  const [remainingTime, setRemainingTime] = useState(TIMER);

  /*
    =================================================
    EFFECT #1 — INTERVAL (Progress Bar)
    =================================================

    WHEN IT RUNS:
    - After component mounts

    WHAT IT DOES:
    - Updates remainingTime every 10ms
    - Drives the <progress> UI

    WHY CLEANUP IS REQUIRED:
    - Prevents state updates after unmount
    - Avoids memory leaks & React warnings
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    /*
      CLEANUP PHASE:
      - Runs when component unmounts
      - Stops the interval immediately
    */
    return () => {
      clearInterval(interval);
    };
  }, []); // Runs once per mount

  /*
    =================================================
    EFFECT #2 — TIMEOUT (Auto Confirm)
    =================================================

    WHEN IT RUNS:
    - After component mounts

    WHAT IT DOES:
    - Automatically confirms deletion after 3 seconds

    WHY onConfirm IS A DEPENDENCY:
    - Functions are references
    - Effect must re-run if function changes
    - useCallback in parent keeps it stable

    WHY CLEANUP IS REQUIRED:
    - Cancels auto-confirm if user closes modal early
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    /*
      CLEANUP PHASE:
      - Runs when component unmounts
      - Runs BEFORE effect re-runs
      - Ensures timeout never fires after unmount
    */
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  /*
    =================================================
    LIFECYCLE SUMMARY (VERY IMPORTANT)
    =================================================

    1. Component mounts
       → Both effects run
       → Interval + timeout start

    2. Component stays mounted
       → Progress bar updates
       → Timer counts down

    3. Component unmounts (modal closes)
       → React runs ALL cleanup functions
       → Interval cleared
       → Timeout cleared

    NOTE:
    Cleanup runs EVEN IF timeout never finished.
  */

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
        Progress bar reflects remaining time.
        value decreases until it reaches 0.
      */}
      <progress value={remainingTime} max={TIMER} />
    </div>
  );
}
