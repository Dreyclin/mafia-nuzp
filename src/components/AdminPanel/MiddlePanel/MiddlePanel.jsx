import React from "react";
import Player from "../../Player";
import Role from "../../Role";
import Timer from "../../Timer";
import TimerControls from "./TimerControls";
import { useSelector } from "react-redux";

export default function MiddlePanel(props) {
    const players = useSelector((state) => state.gameReducer.players);
    let chosenPlayer = players.findIndex(player => player.chosen === true);

    return(
        <div className="middle-panel">
        <div className="chosen-player-container">
            <h1>Player {chosenPlayer + 1}</h1>
        </div>
        <div className="players-container">
            {players.map(player => {
              return <Player key={player.number} number={player.number} role={<Role role={player.role}/>} fouls={player.fouls} chosen={player.chosen}/>  
            })}
        </div>
        <div className="timer-container">
            <Timer />
            <TimerControls />
        </div>
    </div>
    )
}