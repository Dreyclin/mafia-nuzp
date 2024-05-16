import React from "react";

export default function VotingPanel(props) {

    return (
        <div className="voting-panel">
            <h2>Голосование: </h2>
            <h3>Кандидаты:</h3>
            <div className="candidates-container">
                {props.candidates != null && props.candidates.map(candidate => {
                    return <div className="candidate">
                        <div>
                            <span>{candidate.number} {candidate.votes != null && `(${candidate.votes})`} </span>
                        </div>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button>10</button>

                    </div>
                })}
            </div>
            {/* <h3>Голоса:</h3>
            <div className="votes-container">
                {props.candidates != null && props.candidates.map(candidate => {return <div className="vote">{candidate.votes}</div>})}
            </div> */}
        </div>
    )
}