import Player from './components/Player.jsx';

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          {/* **Reusable Player Components**
              - Each <Player> is an independent instance of the Player component, with its own props (`name`, `symbol`).
              - **Isolation**: Each Player manages its own state (`isEditing`) via `useState`, so editing one Player doesn’t affect others.
              - **Why Reusable?** The same Player component is used for multiple players, reducing code duplication and ensuring consistent UI and logic. */}
          <Player name="Player 1" symbol="X" />
          <Player name="Player 2" symbol="O" />
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  );
}

export default App;



