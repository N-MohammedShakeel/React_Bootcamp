// **Purpose**: Displays the history of game moves.
// - **Props**:
//   - `turns`: Array of turn objects from App, containing player and square data.
export default function Log({ turns }) {
  return (
    <ol id="log">
      {/* **Dynamic Log Rendering**
          - Maps over `turns` to show each move (player and square coordinates).
          - Uses a unique `key` based on row/col to ensure efficient updates.
          - Derives UI from props, keeping Log stateless and reusable. */}
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
