export default function Log({ turns }) {
  // **Rendering Logs from Props**
  // - `turns` prop (from App) contains the game history (array of turn objects).
  // - Uses `.map()` to dynamically render a list of moves, showing player and square coordinates.
  // - **Why Derived?** Avoids duplicating state; logs are derived from App’s `gameTurns` state.
  // - Each list item uses a unique `key` based on row and column for efficient rendering.
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
