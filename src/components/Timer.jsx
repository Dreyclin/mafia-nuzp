import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTimer, saveTimerValue} from "../features/game/timerSlice";
import { useSelector } from "react-redux";


export default function Timer() {
    const dispatch = useDispatch();
    const {minutes, seconds} = useSelector((state) => state.timerReducer.time)
    const {isRunning} = useSelector((state) => state.timerReducer)

    useEffect(() => {
        dispatch(loadTimer({minutes: minutes, seconds: seconds, isRunning: isRunning}));
    }, []);

    useEffect(() => {
      let intervalId;
      if(isRunning){
        intervalId = setInterval(() => {
          dispatch(saveTimerValue({minutes: minutes, seconds: seconds}))
        }, 1000);
      } else {
        clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
    }, [isRunning, dispatch]);
    
    return (
        <div className="timer">
            <span>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
        </div>
    )
}