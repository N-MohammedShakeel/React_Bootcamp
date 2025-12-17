import { useState, useEffect } from "react";

/*
  =================================================
  WHY THIS COMPONENT EXISTS
  =================================================

  This component:
  - Updates state every 10ms
  - Would be expensive if kept in parent
  - Isolated to avoid unnecessary re-renders

  Optimization principle:
  → Move fast-changing state DOWN the tree
*/

export default function ProgressBar({ timer }) {
  // Local state ONLY for progress UI
  const [remainingTime, setRemainingTime] = useState(timer);

  /*
    =================================================
    EFFECT — INTERVAL (UI Updates)
    =================================================

    - Runs once on mount
    - Updates progress value every 10ms
    - Cleaned up on unmount
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    /*
      Cleanup:
      - Stops interval when component unmounts
      - Prevents background updates
    */
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}
