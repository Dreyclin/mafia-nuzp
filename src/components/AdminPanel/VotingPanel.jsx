import React from "react";
import { useDispatch } from "react-redux";

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

                    const remainingVotes = props.playersInGame.length - props.candidates.reduce((acc, candidate) => acc + (candidate.votes || 0), 0);
                    const numOfButtons = remainingVotes;

                    if (index === props.candidates.length - 1) {
                        if(props.candidates.length > 1){
                            const unVoted = props.candidates.filter(candidate => candidate.isVoted === false)
                            if(unVoted.length === 1){
                                if (remainingVotes > 0 && !unVoted[0].votes) {
                                    dispatch(props.voteForPlayer({ candidate: unVoted[0].number, votes: remainingVotes }));
                                }
                            }
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
                                        onClick={(event) => dispatch(props.voteForPlayer({ candidate: candidate.number, votes: number }))}>
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