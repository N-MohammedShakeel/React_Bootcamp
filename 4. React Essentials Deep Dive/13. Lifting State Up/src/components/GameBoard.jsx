import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  // **Local State for Game Board**
  // - `gameBoard` state manages the 3x3 grid locally in GameBoard.
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // **Lifting State Up: Using Passed Function**
  // - `onSelectSquare` is a function prop passed from App to notify it of square selections.
  // - **Why Lift State?** Allows App to manage shared state (e.g., activePlayer) across components (GameBoard and Player).
  // - After updating the local `gameBoard`, `onSelectSquare()` is called to trigger App’s logic (e.g., switching players).
  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      // **Using Passed Prop**
      // - `activePlayerSymbol` (from App) sets the symbol ('X' or 'O') for the clicked square.
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    // **Notifying Parent**
    // - Calls `onSelectSquare` to inform App, enabling it to update `activePlayer` state.
    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
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
