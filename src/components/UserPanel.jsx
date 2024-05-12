import React from "react";
import Player from "./Player";
import Timer from "./Timer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updatePlayersData } from "../features/game/gameSlice";
import { loadTimer } from "../features/game/timerSlice";


export default function UserPanel() {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.gameReducer.players);
    const timer = useSelector((state) => state.timerReducer.time);

    useEffect(() => {
        dispatch(updatePlayersData());
    }, [players])

    useEffect(() => {
        dispatch(loadTimer());
        console.log("Timer")
    }, [timer])

    return (
        <div className="user-panel">
            <div className="container">
                <h1>Mafia NUZP</h1>
                <div className="players-container">
                    {players.map(player => {
                        return <Player key={player.number} number={player.number} fouls={player.fouls} chosen={player.chosen} status={player.status} />
                    })}
                </div>
                <Timer />
            </div>
        </div>
    )
}