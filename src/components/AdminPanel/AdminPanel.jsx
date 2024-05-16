import React from "react";
import ControlPanel from "./ControlPanel";
import MiddlePanel from "./MiddlePanel/MiddlePanel";
import VotingPanel from "./VotingPanel";
import { useSelector, useDispatch } from "react-redux";
import { updatePlayersData, loadGame, choosePlayer, loadCandidates } from "../../features/game/gameSlice";
import { useEffect } from "react";

export default function AdminPanel(props) {
    
    const dispatch = useDispatch();
    const players = useSelector((state) => state.gameReducer.players);
    const candidates = useSelector(state => state.gameReducer.candidates);
    let chosenPlayer = players.findIndex(player => player.chosen === true);
    console.log(candidates);
    useEffect(() => {
        dispatch(updatePlayersData());
        dispatch(loadGame());
        dispatch(loadCandidates());
    }, [dispatch])

    function handleChooseClick(number) {
        dispatch(choosePlayer(number))
    }


    return (
        <div className="admin-panel">
           <ControlPanel />
           <MiddlePanel players = {players} chosenPlayer = {chosenPlayer} handleChooseClick={handleChooseClick}/>
           <VotingPanel candidates = {candidates}/>
        </div>
    )
}