import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  // Internal ref to the dialog DOM element
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // Component API exposed to parent
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  // createPortal:
  // - Renders this JSX into a different place in the DOM
  // - Keeps React logic & state connection intact
  // - Used for modals, overlays, tooltips
  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}

      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>

      <p>
        You stopped the timer with{' '}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>

      {/* method="dialog" auto-closes modal on submit */}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,

    // Modal is rendered outside the normal React root
    document.getElementById('modal')
  );
});

export default ResultModal;
