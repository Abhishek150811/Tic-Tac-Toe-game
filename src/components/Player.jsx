import { useState } from "react";

export default function Player({name , symbol , isActive , onChangeName} ){
    const [old_name , set_newname] = useState(name) ;
    const [curr_value , set_newvalue] = useState(false) ;

    function handleClick(){
        set_newvalue((prev_value) => !prev_value) ;
        if(curr_value){
            onChangeName(symbol , old_name)
        }
    }
    function handleChange(event){
        set_newname(event.target.value) ;
    }

    let playerName = <span className="player-name">{old_name} </span>
    let btnValue = "Edit" ;
    if(curr_value){
        playerName = <input type="text" required value={old_name} onChange={handleChange}></input>
        btnValue = "Save"
    }
    return(
        <>
         <li className={isActive ? "active" : ""} >
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick} >{btnValue}</button>
          </li>
        </>
    ) ;
};