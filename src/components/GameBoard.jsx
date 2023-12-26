import { useState } from "react";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSelectSquare , activePlayerSymbol}) {
  const [curr_value , update_value] =  useState(initialBoard) ;

  function handleSelectSquare(rowIndex , colIndex){
    update_value((previous_arr)=>{
      const updateboard = [...previous_arr.map(items=>[...items])] ;
      updateboard[rowIndex][colIndex] = activePlayerSymbol ;
      return updateboard ; 
    })
    onSelectSquare() ;
  }

  return (
    <ol id="game-board">
      {curr_value.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>handleSelectSquare(rowIndex , colIndex)} >{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
