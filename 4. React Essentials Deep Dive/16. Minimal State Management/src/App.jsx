import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

// **Deriving Active Player**
// - `deriveActivePlayer` calculates the current player from `gameTurns`.
// - **Why Derive?** Eliminates `activePlayer` state, reducing state management overhead and potential bugs from state conflicts.
// - Returns 'X' by default or toggles to 'O' based on the latest turn.
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  // **Single State for Game**
  // - `gameTurns` is the only state, storing all moves to derive board, player, and log data.
  // - Reduces state by removing `activePlayer` state, using `deriveActivePlayer` instead.
  const [gameTurns, setGameTurns] = useState([]);

  // **Derived Active Player**
  // - `activePlayer` is derived from `gameTurns`, not stored as state, simplifying logic.
  const activePlayer = deriveActivePlayer(gameTurns);

  // **Handling Square Selection**
  // - Updates `gameTurns` immutably, using `deriveActivePlayer` to get the current player.
  // - Avoids separate `activePlayer` state updates, keeping all logic tied to `gameTurns`.
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* **Using Derived Data**
              - `isActive` uses `activePlayer` (derived from `gameTurns`) to highlight the current player. */}
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {/* **Passing Derived Data**
            - `turns` prop passes `gameTurns` to GameBoard for board state derivation. */}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      {/* **Log Component**
          - `turns` prop passes `gameTurns` to Log for dynamic move rendering. */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
