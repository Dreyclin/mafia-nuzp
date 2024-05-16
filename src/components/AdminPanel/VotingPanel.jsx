import React from "react";
import { useDispatch } from "react-redux";

export default function VotingPanel(props) {

    const dispatch = useDispatch();
    return (
        <div className="voting-panel">
            <h2>Голосование: </h2>
            <h3>Кандидаты:</h3>
            <div className="candidates-container">
                {props.candidates != null && props.candidates.map(candidate => {
                    // number: 2, votes: null
                    // playerInGameLocal = 10;
                    let playersInGameLocal = props.playersInGame.length;
                    let numOfButtons = playersInGameLocal - candidate.votes;
                    // candidate[0].votes = 5;
                    //candidatate[1].votes = null;
                    return (
                        <div className="candidate">
                            <div>
                                <span>{candidate.number} {candidate.votes != null && `(${candidate.votes})`} </span>
                            </div>
                            {}
                            {props.playersInGame.map(player => {
                                let number = 0;
                                if (candidate.votes != null) {
                                    if (!candidate.isVoted) {
                                        return <button
                                            id={candidate.number}
                                            onClick={(event) => dispatch(props.voteForPlayer({ candidate: event.target.id, votes: event.target.textContent }))}>{number}</button>
                                    }
                                } else {
                                    return <button
                                        id={candidate.number}
                                        onClick={(event) => dispatch(props.voteForPlayer({ candidate: event.target.id, votes: event.target.textContent }))}>{number}</button>
                                }
                                number++;
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}