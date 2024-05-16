import React from "react";
import Player from "../../Player";
import Role from "../../Role";
import Timer from "../../Timer";
import TimerControls from "./TimerControls";

export default function MiddlePanel(props) {

    return (
        <div className="middle-panel">
            <div className="chosen-player-container">
                <h1>Player {props.chosenPlayer + 1}</h1>
            </div>
            <div className="players-container">
                {props.players.map(player => {
                    return <Player onClick={() => props.handleChooseClick(player.number)} key={player.number} number={player.number} role={<Role role={player.role} />} fouls={player.fouls} chosen={player.chosen} status={player.status}/>
                })}
            </div>
            <div className="timer-container">
                <Timer minutes={props.timerMinutes} seconds={props.timerSeconds}/>
                <TimerControls />
            </div>
        </div>
    )
}