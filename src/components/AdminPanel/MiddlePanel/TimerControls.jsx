import React from "react";
import { useDispatch } from "react-redux";
import { increaseTime } from "../../../features/game/timerSlice";

export default function TimerControls() {
    
    const dispatch = useDispatch();


    
    return (
        <div className="timer-controls-container">
            <div className="timer-controls-duration">
                <button className="btn btn-primary" onClick={() => dispatch(increaseTime())}>+5 sec</button>
                <button className="btn btn-warning">-5 sec</button>
            </div>
            <div className="timer-controls-time">
                <button className="btn btn-success">Start</button>
                <button className="btn btn-danger">Stop</button>
            </div>
        </div>
    )
}