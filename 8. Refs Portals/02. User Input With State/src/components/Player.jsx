import { useState } from 'react';

export default function Player() {
  // Stores the value typed in the input field
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  // Tracks whether the name is confirmed by clicking the button
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    // Reset submitted when user starts typing again
    setSubmitted(false);
    // Update player name from input
    setEnteredPlayerName(event.target.value);
  }

  function handleClick() {
    // Mark name as submitted
    setSubmitted(true);
  }

  return (
    <section id="player">
      {/* Conditional rendering based on submitted state */}
      <h2>
        Welcome {submitted ? enteredPlayerName : 'unknown entity'}
      </h2>

      <p>
        {/* Controlled input: value is managed by React state */}
        <input
          type="text"
          onChange={handleChange}
          value={enteredPlayerName}
        />

        {/* Button confirms the player name */}
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
