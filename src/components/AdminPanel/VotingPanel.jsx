import React from "react";

export default function VotingPanel() {
    return (
        <div className="voting-panel">
            <h2>Голосование: </h2>
            <h3>Кандидаты:</h3>
            <div className="candidates-container">
                <div className="candidate"></div>
                <div className="candidate"></div>
                <div className="candidate"></div>
                <div className="candidate"></div>
                <div className="candidate"></div>
                <div className="candidate"></div>
                <div className="candidate"></div>
                <div className="candidate"></div>
                <div className="candidate"></div>
                <div className="candidate"></div>
            </div>
            <h3>Голоса:</h3>
            <div className="votes-container">
                <div className="vote"></div>
                <div className="vote"></div>
                <div className="vote"></div>
                <div className="vote"></div>
                <div className="vote"></div>
                <div className="vote"></div>
                <div className="vote"></div>
                <div className="vote"></div>
                <div className="vote"></div>
                <div className="vote"></div>
            </div>
        </div>
    )
}