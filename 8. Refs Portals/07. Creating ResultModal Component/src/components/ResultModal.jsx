export default function ResultModal({ result, targetTime }) {
  return (
    // <dialog>:
    // - Native HTML element for modals and popups
    // - Can be opened with showModal() and closed automatically
    // - Provides built-in focus trapping and accessibility
    <dialog className="result-modal">
      <h2>You {result}</h2>

      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>

      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>

      {/* form method="dialog":
          - "method" tells the browser how the form should behave
          - method="dialog" is special for <dialog> elements
          - Submitting this form automatically closes the dialog
          - No JavaScript or state needed to close the modal */}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
