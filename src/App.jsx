import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./WinningCombination";
import GameOver from "./components/GameOver";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(prevTurns){
    let currentPlayer = 'X' ;
    if ( prevTurns.length > 0 &&  prevTurns[0].player === "X") currentPlayer = "O";
    return currentPlayer ; 
}
function App() {
  const [players , setPlayers] = useState({
    X : 'Player 1' ,
    O : 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlyaer] = useState("X");
  
  let activePLayer = deriveActivePlayer(gameTurns)
  
  let gameBoard = [...initialBoard.map(array => [...array])] ;
  
  for(const turn of gameTurns){
    const {square , player} = turn ; 
    const {row , col} = square ;
    gameBoard[row][col] = player ; 
  }
  let winner ; 
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column] ;
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column] ;
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column] ;
    if(firstSquareSymbol && firstSquareSymbol == secondSquareSymbol && secondSquareSymbol == thirdSquareSymbol){
      winner = players[firstSquareSymbol]  ; 
    }
  }

  const isDraw = gameTurns.length == 9  && !winner; 
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlyaer((oldvalue) => {
    //   if (oldvalue === "X") {
    //     return "O";
    //   }
    //   return "X";
    // });

    setGameTurns((prevTurns) => {
      const currentPLayer = deriveActivePlayer(gameTurns) 
      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player : currentPLayer },
        ...prevTurns,
      ];
      return updateTurn ; 
    });
  }

  function handleRestart(){
    setGameTurns([]) ;
  }
  function handlePlayerNameChange(symbol , newName){
    setPlayers(prevplayer =>{
      return {
        ...prevplayer , 
        [symbol]:newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player  onChangeName={handlePlayerNameChange} name="Player 1" symbol="X" isActive={activePLayer === "X"} />
          <Player onChangeName={handlePlayerNameChange} name="Player 2" symbol="O" isActive={activePLayer === "O"} />
        </ol>
        {(winner || isDraw) && <GameOver  onRestart={handleRestart} winner={winner} />}
        <GameBoard
          
          onSelectSquare={handleSelectSquare}
          board={gameBoard}

        ></GameBoard>
      </div>
      <Log turns={gameTurns} ></Log>
    </main>
  );
}

export default App;
