import { useState, useRef } from 'react';
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({ title, targetTime }) {
  // Stores the timer ID (persists across renders)
  const timer = useRef();

  // Ref used to control the <dialog> element inside ResultModal
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    // Start timer and store ID in ref
    timer.current = setTimeout(() => {
      setTimerExpired(true);

      // Imperatively open the dialog using native API
      dialog.current.showModal();
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    // Stop the timer using stored ID
    clearTimeout(timer.current);
  }

  return (
    <>
      {/* Passing ref to child component using forwardRef */}
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        result="lost"
      />

      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>

        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>

        <p className={timerStarted ? 'active' : undefined}>
          {timerStarted ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
