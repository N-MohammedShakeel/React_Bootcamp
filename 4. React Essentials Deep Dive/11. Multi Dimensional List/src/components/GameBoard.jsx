// **Multi-Dimensional List Rendering**
// - A multi-dimensional list is a nested array (e.g., `initialGameBoard` is a 3x3 grid).
// - **Dynamic Rendering**: Uses `.map()` to iterate over rows and columns, creating UI elements dynamically based on the array’s structure, avoiding hardcoded JSX.
// - **Why Dynamic?** Scales with any grid size, updates automatically if data changes, and reduces repetitive code.
// - **Implementation**: Outer `.map()` loops over rows, inner `.map()` loops over columns, rendering a button for each cell.

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  return (
    <ol id="game-board">
      {/* **Outer Loop for Rows**
          - Maps over `initialGameBoard` to create a `<li>` for each row.
          - `rowIndex` is used as a unique `key` to help React track elements efficiently. */}
      {initialGameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {/* **Inner Loop for Columns**
                - Maps over each `row` to create a `<li>` and `<button>` for each cell.
                - `colIndex` is the key for column elements.
                - `playerSymbol` (e.g., null, 'X', 'O') is displayed in the button.
                - Dynamically generates a 3x3 grid of buttons based on the array. */}
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
