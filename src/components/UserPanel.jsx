import React from "react";
import Player from "./Player";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadGame, updatePlayersData } from "../features/game/gameSlice";
import WinnersComponent from "./WinnersComponent";

export default function UserPanel() {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.gameReducer.players);
    const gameOver = useSelector(state => state.gameReducer.gameOver)
    const winningTeam = useSelector(state => state.gameReducer.winnerTeam);

    let display;

    if(gameOver){
        display = "block";
    } else {
        display = "none";
    }
    
    useEffect(() => {
     
    }, [dispatch])

    useEffect(() => {
        setInterval(() => {
            dispatch(updatePlayersData());
            dispatch(loadGame());
        }, 500);

    }, [dispatch]);

    return (
        <div className="user-panel">
            <div className="container">
                <h1>Mafia NU "Zaporizhzhia Polytechnic"</h1>
                <div className="players-container">
                    {players.map(player => {
                        return <Player key={player.number} number={player.number} fouls={player.fouls} chosen={player.chosen} status={player.status} />
                    })}
                </div>
            </div>
            <WinnersComponent players={players} winningTeam={winningTeam} gameOver={gameOver} display={display}/>
        </div>
    )
}