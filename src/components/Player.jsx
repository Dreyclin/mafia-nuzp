import React from "react";

export default function Player(props) {
    return (
        <div onClick={props.onClick} className={props.chosen ? `player chosen ${props.status}` : `player ${props.status}`}>
            <div className="player-icon-container">
                <i class="fa-solid fa-user"></i>
            </div>
            <div className="player-number-container">
                <span className="player-number">{props.number}</span>
                {props.role}
            </div>
            <div className="player-fouls-container">
                {props.fouls.map(foul => {
                  return <div className="foul">{foul}</div>  
                })}
            </div>
        </div>
    )
}