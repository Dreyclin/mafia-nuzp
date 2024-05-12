import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTimer, increaseTime } from "../features/game/timerSlice";
import { useSelector } from "react-redux";

export default function Timer() {
    
    // const [time, setTime] = useState({ minutes: 1, seconds: 0 });
    const dispatch = useDispatch();
    const {minutes, seconds} = useSelector((state) => state.timerReducer.time)

    useEffect(() => {
        dispatch(loadTimer({minutes: minutes, seconds: seconds}));
    }, []);
    
    return (
        <div className="timer">
            <span>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
        </div>
    )
}