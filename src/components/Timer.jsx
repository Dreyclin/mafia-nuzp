import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Timer() {
    
    const [time, setTime] = useState({ minutes: 1, seconds: 0 });

    useEffect(() => {
      const timerId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(timerId);
            return { minutes: 0, seconds: 0 };
          } else {
            const newSeconds = prevTime.seconds === 0 ? 59 : prevTime.seconds - 1;
            const newMinutes = prevTime.seconds === 0 ? prevTime.minutes - 1 : prevTime.minutes;
            return { minutes: newMinutes, seconds: newSeconds };
          }
        });
      }, 1000);
  
      return () => clearInterval(timerId);
    }, []);
    
    return (
        <div className="timer">
            <span>{time.minutes < 10 ? '0' + time.minutes : time.minutes}:{time.seconds < 10 ? '0' + time.seconds : time.seconds}</span>
        </div>
    )
}