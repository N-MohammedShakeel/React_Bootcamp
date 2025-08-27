import { useState } from "react";

export default function Player({ name, symbol }) {
  // **State for Isolation**
  // - `useState` creates a local `isEditing` state for each Player instance.
  // - Each Player component has its own state, ensuring changes (e.g., editing Player 1) don’t affect Player 2.
  const [isEditing, setIsEditing] = useState(false);

  // **Anonymous Function for State Update**
  // - `setIsEditing((editing) => !editing)` uses an anonymous function to toggle the state based on the previous value.
  // - **Why Necessary?**
  //   - Ensures the update is based on the latest state, avoiding stale state issues.
  //   - React schedules state updates (batches them for performance), so direct updates like `setIsEditing(!isEditing)` might use outdated values if multiple updates occur in one event cycle.
  // - **React Scheduling**: React batches state updates for efficiency, processing them after the event handler finishes. Using the callback (`editing => !editing`) guarantees the update uses the current state, not a potentially stale snapshot.
  function handleEditClick() {
    // ❌ setIsEditing(!isEditing)
    // ✅ safer toggle
    setIsEditing((editing) => !editing);
  }

  // **Conditional Rendering**
  // - Switches between displaying a <span> (name) or <input> based on `isEditing`.
  // - Each Player renders independently, maintaining its own UI state.
  let playerName = <span className="player-name">{name}</span>;

  if (isEditing) {
    playerName = <input type="text" required value={name} />;
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* **Dynamic Button Label**
          - Button text changes based on `isEditing`, showing 'Edit' or 'Save'.
          - Click triggers `handleEditClick`, toggling `isEditing` for this Player only. */}
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
