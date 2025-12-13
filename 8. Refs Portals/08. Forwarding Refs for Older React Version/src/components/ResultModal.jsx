import { forwardRef } from 'react';

// forwardRef:
// - Used to pass a ref from a parent to a child component
// - Needed because refs do NOT work on custom components by default
// - Common in older React versions (before ref-as-prop patterns)
const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  return (
    // ref now points directly to the <dialog> DOM element
    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>

      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>

      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>

      {/* method="dialog" closes the dialog automatically */}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
