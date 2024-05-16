import React from "react";


export default function Timer(props) {
    
    return (
        <div className="timer">
            <span>{props.minutes < 10 ? '0' + props.minutes : props.minutes}:{props.seconds < 10 ? '0' + props.seconds : props.seconds}</span>
        </div>
    )
}