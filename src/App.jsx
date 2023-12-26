import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
function App() {
  const [activePlayer , setActivePlyaer] = useState('X') ;
  
  function handleSelectSquare(){
    setActivePlyaer((oldvalue)=>{
      if(oldvalue === 'X'){
        return 'O' ;
      }
      return 'X' ;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare} ></GameBoard>
      </div>
      Log
    </main>
  );
}

export default App;
