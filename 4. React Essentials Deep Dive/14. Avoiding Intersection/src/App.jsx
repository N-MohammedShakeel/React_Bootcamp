import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function App() {
  // **New State to Avoid Intersection**
  // - `gameTurns` state tracks all game moves as an array of turn objects (square and player).
  // - **Why New State?** Centralizes game history in App, avoiding conflicts between GameBoard’s local state and App’s activePlayer state, ensuring consistent data across components.
  // - Replaces GameBoard’s local state, lifting turn data up to App for better coordination.
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  // **Updating States Immutably**
  // - Updates both `activePlayer` and `gameTurns` when a square is selected.
  // - `setGameTurns` uses a callback to derive `currentPlayer` from `prevTurns`, avoiding reliance on `activePlayer` to prevent state intersection issues.
  // - Adds new turn to `updatedTurns` immutably with spread operator, preserving previous turns.
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
        {/* **Passing Function Prop**
            - `onSelectSquare` is passed to GameBoard to handle clicks, updating `gameTurns` and `activePlayer` in App. */}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
