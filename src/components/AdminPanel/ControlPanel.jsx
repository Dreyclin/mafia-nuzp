import React from "react";
import { useDispatch } from "react-redux";
import { setFoul, setRole, resetGame, switchPlayers, kickPlayer, setOnVoting } from "../../features/game/gameSlice";
import { useSelector } from "react-redux";

export default function ControlPanel() {
    
    const dispatch = useDispatch();
    const players = useSelector(state => state.gameReducer.players);

    const chosenIndex = players.findIndex(player => player.chosen === true);

    function handleSwitchClick(dir) {
        const chosenIndex = players.findIndex(player => player.chosen === true);
        dispatch(switchPlayers({ index: chosenIndex, dir: dir }));
    }

    return(
        <div className="control-panel">
        <button className="btn btn-dark" onClick={() => dispatch(setRole({player: players[chosenIndex], role: "Д", dispatch}))}>Сделать доном</button>
        <button className="btn btn-secondary" onClick={() => dispatch(setRole({player: players[chosenIndex], role: "М", dispatch}))}>Сделать мафией</button>
        <button className="btn btn-warning" onClick={() => dispatch(setRole({player: players[chosenIndex], role: "Ш", dispatch}))}>Сделать шерифом</button>
        <button className="btn btn-danger" onClick={() => dispatch(setRole({player: players[chosenIndex], role: "К", dispatch}))}>Сделать мирным</button>
        <button className="btn btn-light" onClick={() => dispatch(setFoul(players[chosenIndex]))}>Поставить фол</button>
        <button className="btn btn-primary" onClick={() => dispatch(setOnVoting())}>Выставить на голосование</button>
        <button className="btn btn-danger" onClick={() => dispatch(kickPlayer())}>Изгнать</button>
        <button className="btn btn-info" onClick={() => handleSwitchClick("next")}>Следующий игрок</button>
        <button className="btn btn-info" onClick={() => handleSwitchClick("prev")}>Предыдущий игрок</button>
        <button className="btn btn-danger" onClick={() => dispatch(resetGame())}>Сброс игры</button>
    </div>
    )
}