import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTimer} from "../features/game/timerSlice";
import { useSelector } from "react-redux";
import { tick } from "../features/game/timerSlice";


export default function Timer() {
    const dispatch = useDispatch();
    const {minutes, seconds} = useSelector((state) => state.timerReducer.time)
    const {isRunning} = useSelector((state) => state.timerReducer.isRunning)

    useEffect(() => {
        dispatch(loadTimer({minutes: minutes, seconds: seconds}));
    }, []);

    useEffect(() => {
      let intervalId;
  
      if (isRunning) {
        intervalId = setInterval(() => {
          dispatch(tick());
        }, 1000);
      }
  
      return () => clearInterval(intervalId);
    }, [isRunning, dispatch]);
    
    return (
        <div className="timer">
            <span>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
        </div>
    )
}