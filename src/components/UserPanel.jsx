import React from "react";
import Player from "./Player";
import Timer from "./Timer";

export default function UserPanel() {
    let a = [];
    function initPlayers() {
        for (let i = 1; i < 11; i++) {
            a.push(<Player number={i}/>)
        }
        return a;
    }

    return (
        <div className="user-panel">
            <div className="container">
                <h1>Mafia NUZP</h1>
                <div className="players-container">
                    {initPlayers()}
                    {a.forEach(element => {
                        return element;
                    })}
                </div>
                <Timer />
            </div>
        </div>
    )
}