// **Purpose**: Displays game-over message and rematch option.
// - **Props**:
//   - `winner`: Name of the winning player or undefined for a draw.
//   - `onRestart`: Function to reset the game.
export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {/* **Conditional Rendering**
          - Shows winner’s name if `winner` exists, otherwise indicates a draw.
          - Uses ternary-like logic with `&&` for concise rendering. */}
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <p>
        {/* **Restart Trigger**
            - `onRestart` is called on click to reset `gameTurns` in App, starting a new game. */}
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
