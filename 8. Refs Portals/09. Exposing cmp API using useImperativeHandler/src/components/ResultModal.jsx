import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  // Internal ref to the dialog DOM element
  // This stays private to the component
  const dialog = useRef();

  // useImperativeHandle:
  // - Defines the (Component API)
  // - Controls what the parent can access via the ref
  // - Hides internal DOM implementation
  // - Exposes only allowed actions
  useImperativeHandle(ref, () => {
    return {
      // This method becomes part of the component's public API
      open() {
        // Parent can call dialogRef.current.open()
        // Parent cannot access dialog.current directly
        dialog.current.showModal();
      }
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}</h2>

      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>

      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>

      {/* method="dialog":
          - Submitting this form closes the dialog automatically */}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
