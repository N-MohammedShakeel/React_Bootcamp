export default function GameOver({ winner }) {
  // **Game Over Display**
  // - Renders when the game ends, determined by `winner` or draw in App.
  // - Conditionally shows winner name or draw message based on `winner` prop.
  // - **Why?** Separates game-over UI logic, making it reusable and clean.
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <p>
        <button>Rematch!</button>
      </p>
    </div>
  );
}
