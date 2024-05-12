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
      setInterval(() => {
        dispatch(loadTimer({minutes: minutes, seconds: seconds}));
        // setTime(prevTime => {
        //   if (prevTime.minutes === 0 && prevTime.seconds === 0) {
        //     clearInterval(timerId);
        //     return { minutes: 0, seconds: 0 };
        //   } else {
        //     const newSeconds = prevTime.seconds === 0 ? 59 : prevTime.seconds - 1;
        //     const newMinutes = prevTime.seconds === 0 ? prevTime.minutes - 1 : prevTime.minutes;
        //     return { minutes: newMinutes, seconds: newSeconds };
        //   }
        // });
        
      }, 1000);
  
      // return () => clearInterval(timerId);
    }, []);
    
    return (
        <div className="timer">
            <span>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
        </div>
    )
}