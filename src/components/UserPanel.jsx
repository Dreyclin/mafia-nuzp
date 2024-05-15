import React from "react";
import Player from "./Player";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadGame, updatePlayersData } from "../features/game/gameSlice";
import { loadTimer } from "../features/game/timerSlice";
import WinnersComponent from "./WinnersComponent";

export default function UserPanel() {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.gameReducer.players);

    const gameOver = useSelector(state => state.gameReducer.gameOver)
    const winningTeam = useSelector(state => state.gameReducer.winningTeam);
    const {minutes, seconds} = useSelector((state) => state.timerReducer.time)
    const {isRunning} = useSelector((state) => state.timerReducer.isRunning)
    console.log(players);
    const display = "block";


    useEffect(() => {
        dispatch(loadGame());
    }, [])

    useEffect(() => {
        setInterval(() => {
            dispatch(updatePlayersData());
        }, 500);

    }, [dispatch]);

    return (
        <div className="user-panel">
            <div className="container">
                <h1>Mafia NUZP</h1>
                <div className="players-container">
                    {players.map(player => {
                        return <Player key={player.number} number={player.number} fouls={player.fouls} chosen={player.chosen} status={player.status} />
                    })}
                </div>
            </div>
            <WinnersComponent winningTeam={winningTeam} gameOver={gameOver} display={display}/>
        </div>
    )
}