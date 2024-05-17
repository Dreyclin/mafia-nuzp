import React from "react";
import { useDispatch } from "react-redux";
import { countingVotes } from "../../features/game/gameSlice";

export default function VotingPanel(props) {
    const dispatch = useDispatch();

    return (
        <div className="voting-panel">
            <h2>Голосование: </h2>
            <h3>Кандидаты:</h3>
            <div className="candidates-container">
                {props.candidates != null && props.candidates.map((candidate, index) => {
                    if (candidate.isVoted) {
                        return (
                            <div className="candidate" key={candidate.number}>
                                <div>
                                    <span>{candidate.number} {candidate.votes != null && `(${candidate.votes})`}</span>
                                </div>
                            </div>
                        )
                    }

                    const unVoted = props.candidates.filter(candidate => candidate.isVoted === false);
                    const remainingVotes = props.playersInGame.length - props.candidates.reduce((acc, candidate) => acc + (candidate.votes || 0), 0);
                    const numOfButtons = remainingVotes;
                    console.log(remainingVotes);
                    console.log(unVoted);
                    if (unVoted.length === 1) {
                        if (props.candidates.length > 1) {
                            dispatch(props.voteForPlayer({ candidate: unVoted[0].number, votes: remainingVotes, endVoting: true }));
                        }
                    }

                    return (
                        <div className="candidate" key={candidate.number}>
                            <div>
                                <span>{candidate.number} {candidate.votes != null && `(${candidate.votes})`}</span>
                            </div>
                            {Array.from({ length: numOfButtons }, (_, index) => {
                                let number = index + 1;
                                return (
                                    <button
                                        key={`${candidate.number}-${number}`}
                                        id={`${candidate.number}-${number}`}
                                        onClick={(event) => {unVoted.length === 1 ? dispatch(props.voteForPlayer({ candidate: candidate.number, votes: number, endVoting: true})) : dispatch(props.voteForPlayer({ candidate: candidate.number, votes: number, endVoting: false}))} }>
                                        {number}
                                    </button>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}