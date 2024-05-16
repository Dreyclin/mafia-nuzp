import React from "react";
import ControlPanel from "./ControlPanel";
import MiddlePanel from "./MiddlePanel/MiddlePanel";
import VotingPanel from "./VotingPanel";
import { useSelector, useDispatch } from "react-redux";
import { updatePlayersData, loadGame, choosePlayer, loadCandidates, voteForPlayer } from "../../features/game/gameSlice";
import { useEffect } from "react";
import { loadTimer, saveTimerValue } from "../../features/game/timerSlice";

export default function AdminPanel(props) {
    
    const dispatch = useDispatch();
    const players = useSelector((state) => state.gameReducer.players);
    const candidates = useSelector(state => state.gameReducer.candidates);

    const playersInGame = players.map(player => player.status === "in-game");

    
    let chosenPlayer = players.findIndex(player => player.chosen === true);
    
    const {minutes, seconds} = useSelector((state) => state.timerReducer.time)
    const {isRunning} = useSelector((state) => state.timerReducer)

    useEffect(() => {
        dispatch(loadTimer({minutes: minutes, seconds: seconds, isRunning: isRunning}));
    }, []);

    useEffect(() => {
      let intervalId;
      if(isRunning){
        intervalId = setInterval(() => {
          dispatch(saveTimerValue({minutes: minutes, seconds: seconds}))
        }, 1000);
      } else {
        clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
    }, [isRunning, dispatch]);
    

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
           <MiddlePanel timerMinutes={minutes} timerSeconds={seconds} players = {players} chosenPlayer = {chosenPlayer} handleChooseClick={handleChooseClick}/>
           <VotingPanel candidates = {candidates} playersInGame = {playersInGame.filter(player => player === true)} voteForPlayer={voteForPlayer}/>
        </div>
    )
}