import React, { useState, useEffect } from 'react';
import styles from './timer.module.css';

function Timer() {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('time');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const savedIsRunning = localStorage.getItem('isRunning');
    return savedIsRunning === 'true';
  });

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.setItem('time', 0);
    localStorage.setItem('isRunning', false);
  };

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => {
          const newTime = prev - 1;
          localStorage.setItem('time', newTime);
          return newTime;
        });
      }, 1000);
    } else if (time === 0 && isRunning) {
      clearInterval(interval);
      alert('Time is up!');
      setIsRunning(false);
      localStorage.setItem('isRunning', false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    localStorage.setItem('isRunning', isRunning);
  }, [isRunning]);

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return { hours, minutes, seconds };
  };

  return (
    <div className={styles.container}>
      <div className={styles.timer}>

        <div>
          <div className={styles.block}>
            <p className={styles.number}>{formatTime(time).hours}</p>

            <div className={styles.controller}>
              <button className={styles.controlbutton} onClick={() => setTime((prev) => prev + 3600)}>+</button>
              <button className={styles.controlbutton} onClick={() => setTime((prev) => (prev >= 3600 ? prev - 3600 : 0))}>-</button>
            </div>

          </div>
        </div>
        <div>
          <div className={styles.block}>
            <p className={styles.number}>{formatTime(time).minutes}</p>

            <div className={styles.controller}>
              <button className={styles.controlbutton} onClick={() => setTime((prev) => prev + 60)}>+</button>
              <button className={styles.controlbutton} onClick={() => setTime((prev) => (prev >= 60 ? prev - 60 : 0))}>-</button>
            </div>

          </div>
        </div>
        <div>
          <div className={styles.block}>
            <p className={styles.number}>{formatTime(time).seconds}</p>

            <div className={styles.controller}>
              <button className={styles.controlbutton} onClick={() => setTime((prev) => prev + 1)}>+</button>
              <button className={styles.controlbutton} onClick={() => setTime((prev) => (prev >= 1 ? prev - 1 : 0))}>-</button>
            </div>

          </div>
        </div>

      </div>

      <div>
      <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
