import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WinnersComponent(props) {
    const winnerTeam = props.winningTeam;
    const players = props.players;
    
    return (
        <div className="modal-container" style={{ display: props.display }}>
            <div className="modal-title">
                <h3>Победа {winnerTeam}!</h3>
            </div>
            <div className="modal-content">
                {players.map(player => (
                    (player.role === "М" || player.role === "Ш" || player.role === "Д") &&
                    <div className="modal-player-container">
                        <span>{player.number} - {player.role}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}