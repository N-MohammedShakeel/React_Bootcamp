/*
  Simple reusable error component

  Props:
  - title    → error heading
  - message  → detailed error message
  - onConfirm (optional) → action button
*/

export default function Error({ title, message, onConfirm }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>

      {/* Optional confirmation button */}
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
