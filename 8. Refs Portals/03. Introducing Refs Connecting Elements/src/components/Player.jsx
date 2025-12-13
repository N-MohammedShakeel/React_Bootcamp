import { useState, useRef } from 'react';

export default function Player() {
  // useRef:
  // - Creates a mutable object that persists across renders
  // - Updating ref.current does NOT trigger a re-render
  // - Commonly used to directly access DOM elements
  const playerName = useRef();

  // State is used only to trigger re-render for display
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  
  function handleClick() {
    // Access the input value directly via ref
    setEnteredPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      {/* Nullish coalescing operator used for fallback text */}
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>

      <p>
        {/* ref connects the input DOM element to playerName.current */}
        <input
          ref={playerName}
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
