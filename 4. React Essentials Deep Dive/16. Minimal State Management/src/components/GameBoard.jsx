const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  // **Deriving Board State**
  // - `gameBoard` is derived from `turns` prop, avoiding local state to reduce complexity.
  // - Loops through `turns` to update a copy of `initialGameBoard` with player symbols.
  let gameBoard = initialGameBoard;

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
                {/* **Disabling Buttons**
                    - `disabled={playerSymbol !== null}` prevents clicking already-filled squares.
                    - Ensures valid gameplay by blocking redundant moves.
                    - `onClick` triggers `onSelectSquare` to update `gameTurns` in App. */}
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
