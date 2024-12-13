import React, { useState, useEffect } from 'react';
import styles from './stopwatch.module.css'
function Stopwatch() {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('stopwatchTime');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const savedIsRunning = localStorage.getItem('stopwatchIsRunning');
    return savedIsRunning === 'true';
  });


  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };



  const stopTime = () => {
    setTime(0);
    setIsRunning(false);
    localStorage.setItem('stopwatchTime', 0);
    localStorage.setItem('stopwatchIsRunning', false);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          localStorage.setItem('stopwatchTime', newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem('stopwatchIsRunning', isRunning);
  }, [isRunning]);

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.number}>{formatTime(time)}</h1>
      <div className="controls">
        <button onClick={toggleStartStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={stopTime} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
