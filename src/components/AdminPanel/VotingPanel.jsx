import React from "react";

export default function VotingPanel(props) {

    return (
        <div className="voting-panel">
            <h2>Голосование: </h2>
            <h3>Кандидаты:</h3>
            <div className="candidates-container">
                {props.candidates != null && props.candidates.map(candidate => {
                        return <div className="candidate">
                            {candidate.number}
                        </div>
                })}
            </div>
            <h3>Голоса:</h3>
            <div className="votes-container">
                {props.candidates != null && props.candidates.map(candidate => {return <div className="vote">{candidate.votes}</div>})}
            </div>
        </div>
    )
}