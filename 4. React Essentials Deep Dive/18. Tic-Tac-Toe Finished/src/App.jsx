import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

// **Initial Player Data**
// - Stores default player names, updated when players edit their names.
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// **Derive Active Player**
// - Determines current player ('X' or 'O') from `gameTurns`.
// - **Why Derive?** Eliminates `activePlayer` state, reducing state complexity.
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

// **Derive Game Board**
// - Creates board from `INITIAL_GAME_BOARD` and `gameTurns`.
// - **Why Derive?** Avoids duplicating state, ensuring consistency with `gameTurns`.
function deriveGameBoard(gameTurns) {
  // **Immutable Derivation**
  // - Creates a deep clone of `INITIAL_GAME_BOARD` to avoid mutating the original.
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

// **Derive Winner**
// - Checks `WINNING_COMBINATIONS` for three matching symbols.
// - Returns the winning player’s name from `players` or undefined.
function deriveWinner(gameBoard, players) {
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
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  // **State Management**
  // - `players`: Tracks player names, updated via `onChangeName` from Player.
  // - `gameTurns`: Stores all game moves, used to derive board, player, and winner.
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  // **Derived State**
  // - `activePlayer`: Derived from `gameTurns` for current player.
  // - `gameBoard`: Derived from `gameTurns` for board display.
  // - `winner`: Derived from `gameBoard` and `players` for game outcome.
  // - `hasDraw`: True if 9 turns are made without a winner.
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  // **Handling Square Selection**
  // - Updates `gameTurns` immutably, adding new turn with current player and square.
  // - Uses `deriveActivePlayer` to ensure correct player without extra state.
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

  // **Handling Game Restart**
  // - Resets `gameTurns` to empty, restarting the game.
  function handleRestart() {
    setGameTurns([]);
  }

  // **Handling Player Name Changes**
  // - Updates `players` state immutably with new name for the given symbol.
  // - **Why Lifted?** Centralizes player data in App for use in winner display.
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* **Player Components**
              - Pass `onChangeName` to update `players` state in App.
              - `isActive` highlights the current player based on derived `activePlayer`. */}
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* **Game Over Rendering**
            - Shows <GameOver> when `winner` or `hasDraw` is true.
            - Passes `winner` and `onRestart` for display and reset. */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/* **Game Board**
            - Passes `onSelectSquare` to handle clicks and `board` for display. */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      {/* **Log**
          - Passes `gameTurns` to display move history. */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
