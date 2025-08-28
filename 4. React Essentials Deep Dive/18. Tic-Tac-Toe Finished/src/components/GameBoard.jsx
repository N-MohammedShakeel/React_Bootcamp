// **Purpose**: Renders the 3x3 Tic-Tac-Toe board and handles square selections.
// - **Props**:
//   - `onSelectSquare`: Function to notify App of square clicks.
//   - `board`: Derived game board state from App, used to display symbols.
export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {/* **Dynamic Rendering of Board**
          - Uses `.map()` to iterate over `board` (3x3 array) to render rows and columns dynamically.
          - Each row and cell has a unique `key` for React’s efficient rendering.
          - Scales with any board size, avoiding hardcoded JSX. */}
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* **Button Behavior**
                    - `onClick` triggers `onSelectSquare` with row/col indices to update game state in App.
                    - `disabled={playerSymbol !== null}` prevents clicking filled squares, ensuring valid gameplay.
                    - Displays `playerSymbol` (null, 'X', or 'O') from derived `board`. */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
