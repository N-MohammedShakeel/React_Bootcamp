const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  // **Deriving State from Props**
  // - `gameBoard` is derived from the `turns` prop, not stored as local state.
  // - **Why Derive?** Avoids duplicating state (managed in App as `gameTurns`), ensuring consistency and reducing bugs from state mismatches.
  // - Creates a new board from `initialGameBoard` and updates it with `turns` data.
  let gameBoard = initialGameBoard;

  // **Deriving Board State**
  // - Iterates over `turns` to update `gameBoard` with player symbols ('X' or 'O').
  // - Uses a mutable copy of `initialGameBoard` for derivation, as it’s not state and won’t persist across renders.
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* **Rendering Derived Data**
                    - Each button displays `playerSymbol` from the derived `gameBoard`.
                    - `onClick` calls `onSelectSquare` to update `gameTurns` in App, triggering a re-render with new derived state. */}
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
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
