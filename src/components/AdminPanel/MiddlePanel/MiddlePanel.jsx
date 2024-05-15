import React, { useEffect } from "react";
import Player from "../../Player";
import Role from "../../Role";
import Timer from "../../Timer";
import TimerControls from "./TimerControls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePlayersData } from "../../../features/game/gameSlice";
import { choosePlayer } from "../../../features/game/gameSlice";
import { loadGame } from "../../../features/game/gameSlice";

export default function MiddlePanel(props) {

    const dispatch = useDispatch();

    const players = useSelector((state) => state.gameReducer.players);
    let chosenPlayer = players.findIndex(player => player.chosen === true);

    useEffect(() => {
        dispatch(updatePlayersData());
        dispatch(loadGame());
    }, [])

    function handleChooseClick(number) {
        dispatch(choosePlayer(number))
    }

    return (
        <div className="middle-panel">
            <div className="chosen-player-container">
                <h1>Player {chosenPlayer + 1}</h1>
            </div>
            <div className="players-container">
                {players.map(player => {
                    return <Player onClick={() => handleChooseClick(player.number)} key={player.number} number={player.number} role={<Role role={player.role} />} fouls={player.fouls} chosen={player.chosen} status={player.status}/>
                })}
            </div>
            <div className="timer-container">
                <Timer />
                <TimerControls />
            </div>
        </div>
    )
}