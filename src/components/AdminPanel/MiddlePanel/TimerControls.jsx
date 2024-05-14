import React from "react";
import { useDispatch } from "react-redux";
import { controlAmountTime } from "../../../features/game/timerSlice";
import { timerControls } from "../../../features/game/timerSlice";

export default function TimerControls() {
    
    const dispatch = useDispatch();


    
    return (
        <div className="timer-controls-container">
            <div className="timer-controls-duration">
                <button className="btn btn-primary" onClick={() => dispatch(controlAmountTime("inc", dispatch))}>+5 sec</button>
                <button className="btn btn-warning" onClick={() => dispatch(controlAmountTime("dec", dispatch))}>-5 sec</button>
            </div>
            <div className="timer-controls-time">
                <button className="btn btn-success" onClick={() => dispatch(timerControls("start"))}>Start</button>
                <button className="btn btn-danger" onClick={() => dispatch(timerControls("stop"))}>Stop</button>
            </div>
        </div>
    )
}