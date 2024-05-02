import React from "react";

export default function TimerControls() {
    return (
        <div className="timer-controls-container">
            <div className="timer-controls-duration">
                <button className="btn btn-primary">+5 sec</button>
                <button className="btn btn-warning">-5 sec</button>
            </div>
            <div className="timer-controls-time">
                <button className="btn btn-success">Start</button>
                <button className="btn btn-danger">Stop</button>
            </div>
        </div>
    )
}