import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
  // **Shared State for Players**
  // - `activePlayer` state tracks whose turn it is ('X' or 'O').
  // - Managed in App to coordinate between GameBoard and Player components.
  const [activePlayer, setActivePlayer] = useState("X");

  // **Lifting State Up: Handling Square Selection**
  // - `handleSelectSquare` is defined in App and passed to GameBoard.
  // - When called by GameBoard, it toggles `activePlayer`, ensuring Player components and GameBoard stay in sync.
  // - **Why in App?** Centralizes state management, allowing App to control game flow and share `activePlayer` with multiple components.
  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* **Passing Shared State**
              - `isActive` prop uses `activePlayer` to highlight the active player.
              - Each Player is independent but uses shared state from App. */}
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
        {/* **Passing Function and State**
            - `onSelectSquare` passes `handleSelectSquare` to GameBoard to trigger player switching.
            - `activePlayerSymbol` passes the current `activePlayer` for updating the board. */}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
      LOG
    </main>
  );
}

export default App;
