import { useState, useRef } from 'react';

export default function Player() {
  // Ref used to directly access and manipulate the input DOM element
  const playerName = useRef();

  // State used only for rendering the welcome message
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  
  function handleClick() {
    // Read value directly from the DOM using ref
    setEnteredPlayerName(playerName.current.value);

    // Direct DOM manipulation: clearing the input field
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>

      <p>
        {/* ref connects this input element to playerName.current */}
        <input
          ref={playerName}
          type="text"
        />

        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
