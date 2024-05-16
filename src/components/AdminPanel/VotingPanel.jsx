import React from "react";

export default function VotingPanel(props) {
    return (
        <div className="voting-panel">
            <h2>Голосование: </h2>
            <h3>Кандидаты:</h3>
            <div className="candidates-container">
                {props.candidates != null && props.candidates.map(candidate => {
                    let number = 0;
                    return (
                        <div className="candidate">
                            <div>
                                <span>{candidate.number} {candidate.votes != null && `(${candidate.votes})`} </span>
                            </div>
                            {props.playersInGame.map(player => {
                                if(player){
                                    number++;
                                    return <button>{number}</button>
                                }
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}