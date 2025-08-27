const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare }) {
  // **Removed Local State**
  // - Local `gameBoard` state is commented out to avoid intersection with App’s `gameTurns` state.
  // - **Why?** Managing board state in GameBoard could conflict with App’s turn tracking, leading to inconsistent UI updates.
  // - Instead, GameBoard relies on App to manage game state, receiving `onSelectSquare` to trigger updates.
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });
  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* **Simplified Button**
                    - Button uses `onSelectSquare` directly, passing control to App’s state management.
                    - `playerSymbol` is not yet dynamic (requires `gameTurns` data to derive board state). */}
                <button onClick={onSelectSquare}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
