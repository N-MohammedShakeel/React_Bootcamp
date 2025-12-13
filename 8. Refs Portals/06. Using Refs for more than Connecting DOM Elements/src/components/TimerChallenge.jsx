import { useState, useRef } from 'react';

// ❌ Not using a normal variable:
// let timer;
// - Normal variables are reset on every render
// - React components re-execute on state updates
// - Timer ID would be lost after re-render

export default function TimerChallenge({ title, targetTime }) {
  // useRef is used to store the timer ID
  // - Value persists across renders
  // - Updating ref.current does NOT cause re-render
  const timer = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    // Store timeout ID inside ref
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    // Clear the timer using the stored ID
    clearTimeout(timer.current);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>

      {timerExpired && <p>You lost!</p>}

      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>

      <p>
        {/* Button switches behavior based on timer state */}
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>

      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
  );
}
