import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function App() {
  // **State for Game Logic**
  // - `gameTurns` stores all moves, used to derive the game board state in GameBoard.
  // - `activePlayer` tracks the current player ('X' or 'O').
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  // **Handling Square Selection**
  // - Updates `activePlayer` and adds a new turn to `gameTurns` immutably.
  // - `gameTurns` is passed to GameBoard to derive the board state.
  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
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
        {/* **Passing Data for Derivation**
            - `turns={gameTurns}` passes the turn history to GameBoard.
            - GameBoard derives the board state from `turns` instead of managing it locally. */}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log />
    </main>
  );
}

export default App;
