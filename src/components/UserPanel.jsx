import React from "react";
import Player from "./Player";
import Timer from "./Timer";
import { useSelector } from "react-redux";

export default function UserPanel() {
    
    const players = useSelector((state) => state.gameReducer.players);

    return (
        <div className="user-panel">
            <div className="container">
                <h1>Mafia NUZP</h1>
                <div className="players-container">
                    {players.map(player => {
                        return <Player key={player.number} number={player.number} fouls={player.fouls} chosen={player.chosen}/>
                    })}
                </div>
                <Timer />
            </div>
        </div>
    )
}