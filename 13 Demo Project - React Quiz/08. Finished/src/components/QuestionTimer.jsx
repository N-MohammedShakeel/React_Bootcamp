import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  /*
    EFFECT #1 — setTimeout
    - Triggers skip / next question
    - Cleared on unmount or timeout change
  */
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  /*
    EFFECT #2 — setInterval
    - Updates progress bar every 100ms
    - Runs once per mount
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode} // visual feedback (answered/correct/wrong)
    />
  );
}
