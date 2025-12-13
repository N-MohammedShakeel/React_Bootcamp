import { useState } from 'react';

export default function TimerChallenge({ title, targetTime }) {
  // Tracks whether the timer has started
  const [timerStarted, setTimerStarted] = useState(false);

  // Tracks whether the time limit is reached
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    // setTimeout schedules code to run after targetTime seconds
    setTimeout(() => {
      setTimerExpired(true); // timer finished
    }, targetTime * 1000);

    // Mark timer as running
    setTimerStarted(true);
  }

  function handleStop() {
    // Will be used later to stop/clear the timer
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>

      {/* Shown when timer finishes */}
      {timerExpired && <p>You lost!</p>}

      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>

      <p>
        {/* Button label depends on timer state */}
        <button onClick={handleStart}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>

      {/* Dynamic UI feedback based on timer state */}
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
  );
}
