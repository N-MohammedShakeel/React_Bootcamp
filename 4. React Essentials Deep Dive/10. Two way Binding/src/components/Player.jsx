import { useState } from "react";

export default function Player({ initialName, symbol }) {
  // **Two-Way Binding: State Setup**
  // - `playerName` state stores the current name, initialized with `initialName` prop.
  // - Two-way binding syncs the input field’s value with the `playerName` state, allowing user input to update state and state to update the UI.
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // **Two-Way Binding: Handling Edit Toggle**
  // - Toggles `isEditing` to switch between display (`<span>`) and input modes.
  // - No direct role in two-way binding but controls when the input is shown.
  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  // **Two-Way Binding: Handling Input Changes**
  // - `handleChange` updates `playerName` state with the input’s value (`event.target.value`).
  // - The `onChange` event ensures user input updates the state, completing the two-way sync.
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  // **Two-Way Binding: Conditional UI**
  // - When `isEditing` is false, shows `playerName` in a `<span>`.
  // - When true, shows an `<input>` with `value={playerName}` (binds state to UI) and `onChange={handleChange}` (binds UI to state).
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    // **Two-Way Binding in Action**
    // - `value={playerName}` sets the input’s value to the current state.
    // - `onChange={handleChange}` updates the state when the user types.
    // - This creates a two-way connection: state controls the input, and input updates the state.
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
