import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  // **State for Game Board**
  // - `gameBoard` state holds the current 3x3 grid, initialized with `initialGameBoard`.
  // - `useState` ensures UI updates when the board changes.
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // **Immutable State Update with Deep Clone**
  // - `handleSelectSquare` updates `gameBoard` immutably to avoid mutating the original state directly.
  // - **Why Immutable?** React relies on new state references to detect changes and trigger re-renders. Mutating state directly (e.g., `prevGameBoard[rowIndex][colIndex] = 'X'`) can lead to bugs, especially with multiple state updates, as React may not detect changes.
  // - **Deep Clone**: `[...prevGameBoard.map(innerArray => [...innerArray])]` creates a new copy of the 2D array, ensuring no reference to the original state is altered.
  // - **Why Deep Clone?** Nested arrays require copying each inner array to avoid shared references, preventing unintended side effects in complex state updates.
  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      // **Creating a Deep Clone**
      // - `...prevGameBoard` copies the outer array, `map(innerArray => [...innerArray])` copies each inner array.
      // - `updatedBoard[rowIndex][colIndex] = 'X'` modifies the cloned array, not the original.
      // - Returning `updatedBoard` sets the new state, triggering a re-render.
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = "X";
      return updatedBoard;
    });
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* **Dynamic Button with Event Handler**
                    - `onClick` calls `handleSelectSquare` with `rowIndex` and `colIndex`, updating the board immutably.
                    - Displays `playerSymbol` (e.g., null, 'X') in each button. */}
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
