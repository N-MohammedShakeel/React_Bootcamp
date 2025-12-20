import { useState, useEffect } from "react";

export default function ProgressBar({ timer }) {
  // Remaining time in ms
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    // Update progress every 10ms
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}
