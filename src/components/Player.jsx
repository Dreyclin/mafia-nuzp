import React from "react";

export default function Player(props) {
    return (
        <div className="player">
            <div className="player-icon-container">
                <i class="fa-solid fa-user"></i>
            </div>
            <div className="player-number-container">
                <span className="player-number">{props.number}</span>
                {props.role}
            </div>
            <div className="player-fouls-container">
                <div className="foul">F</div>
                <div className="foul">F</div>
                <div className="foul">F</div>
                <div className="foul">F</div>
            </div>
        </div>
    )
}