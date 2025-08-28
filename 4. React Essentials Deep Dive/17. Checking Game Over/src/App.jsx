import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  // **Single State for Game**
  // - `gameTurns` tracks all moves, used to derive board, active player, and game outcome.
  const [gameTurns, setGameTurns] = useState([]);

  // **Derived Active Player**
  // - Calculates current player from `gameTurns`, avoiding extra state.
  const activePlayer = deriveActivePlayer(gameTurns);

  // **Derived Game Board**
  // - Builds board from `initialGameBoard` and `gameTurns` for rendering.
  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  // **Checking Game Over: Winner Detection**
  // - Iterates `WINNING_COMBINATIONS` to check for three matching symbols.
  // - Sets `winner` to the winning symbol ('X' or 'O') if a combination is found.
  // - **Why Derive?** Avoids storing winner in state, deriving it from `gameBoard` for simplicity.
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  // **Checking Game Over: Draw Detection**
  // - A draw occurs when all 9 squares are filled (`gameTurns.length === 9`) and no winner exists.
  // - `hasDraw` is derived to avoid extra state, keeping logic clean.
  const hasDraw = gameTurns.length === 9 && !winner;

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
        {/* **Conditional Game Over**
            - Renders <GameOver> when `winner` exists or `hasDraw` is true.
            - Passes `winner` prop to display winner or draw message. */}
        {(winner || hasDraw) && <GameOver winner={winner} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
