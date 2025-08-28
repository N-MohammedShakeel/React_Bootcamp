import { useState } from "react";

// **Purpose**: Manages player info (name, symbol) and editing functionality.
// - **Props**:
//   - `initialName`: Starting name for the player.
//   - `symbol`: Player’s symbol ('X' or 'O').
//   - `isActive`: Boolean to highlight active player.
//   - `onChangeName`: Function to update player name in App.
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  // **Local State for Player**
  // - `playerName` tracks the current name, initialized with `initialName`.
  // - `isEditing` toggles between display and input modes.
  // - Each Player instance is isolated, managing its own state independently.
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // **Two-Way Binding: Toggle Editing**
  // - Toggles `isEditing` to switch between `<span>` and `<input>`.
  // - On save (`isEditing` becomes false), calls `onChangeName` to update App’s player data.
  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // **Two-Way Binding: Input Handling**
  // - Updates `playerName` state with user input, syncing input value and state.
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  // **Conditional Rendering for Name**
  // - Shows `<span>` with `playerName` or `<input>` based on `isEditing`.
  // - `<input>` uses two-way binding: `value={playerName}` and `onChange={handleChange}`.
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    // **Active Player Styling**
    // - `className={isActive ? 'active' : undefined}` applies 'active' class when `isActive` is true.
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
