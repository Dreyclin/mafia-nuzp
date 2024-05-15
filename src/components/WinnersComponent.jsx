import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WinnersComponent(props) {
    const gameOver = useSelector(state => state.gameReducer.gameOver)
    const winnerTeam = useSelector(state => state.gameReducer.winnerTeam)
    const players = useSelector(state => state.gameReducer.players)
    
    console.log(winnerTeam, gameOver);
    
    let roles = [];

    // useEffect(() => {
    //     console.log(gameOver, winnerTeam);
    //     if (gameOver) {
    //         players.map(player => {
    //             if (player.role === "Ш" || player.role === "М" || player.role === "Д") {
    //                 console.log(player);
    //                 roles.push({ number: player.number, role: player.role })
    //             }
    //         })
    //     }
    // }, [gameOver, players, winnerTeam])


    return (
        <div className="modal-container" style={{ display: props.display }}>
            <div className="modal-title">
                <h3>Победа {winnerTeam}!</h3>
            </div>
            <div className="modal-content">
                {roles.map(role => {
                    <div className="modal-player-container">{role.number} - {role.role}</div>
                })}
            </div>
        </div>
    )
}