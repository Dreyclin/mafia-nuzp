import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadCandidates } from "../../features/game/gameSlice";
import { useDispatch } from "react-redux";

export default function VotingPanel() {

    const candidates = useSelector(state => state.gameReducer.candidates)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCandidates())
    }, [candidates])

    return (
        <div className="voting-panel">
            <h2>Голосование: </h2>
            <h3>Кандидаты:</h3>
            <div className="candidates-container">
                {candidates.map(candidate => {
                        <div className="candidate">
                            {candidate.number}
                        </div>
                })}
            </div>
            <h3>Голоса:</h3>
            <div className="votes-container">
                {candidates.map(candidate => <div className="vote">{candidate.votes}</div>)}
            </div>
        </div>
    )
}