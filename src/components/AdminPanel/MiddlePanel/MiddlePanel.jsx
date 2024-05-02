import React from "react";
import Player from "../../Player";
import Role from "../../Role";
import Timer from "../../Timer";
import TimerControls from "./TimerControls";

export default function MiddlePanel() {
    return(
        <div className="middle-panel">
        <div className="chosen-player-container">
            <h1>Player 1</h1>
        </div>
        <div className="players-container">
            <Player number={10} role={<Role role={"Д"} />} />
            <Player number={10} role={<Role role={"Д"} />} />
            <Player number={10} role={<Role role={"Д"} />} />
            <Player number={10} role={<Role role={"Д"} />} />
            <Player number={10} role={<Role role={"Д"} />} />
            <Player number={10} role={<Role role={"Д"} />} />
            <Player number={10} role={<Role role={"Д"} />} />
            <Player number={10} role={<Role role={"Д"} />} />
            <Player number={10} role={<Role role={"Д"} />} />
            <Player number={10} role={<Role role={"Д"} />} />
        </div>
        <div className="timer-container">
            <Timer />
            <TimerControls />
        </div>
    </div>
    )
}