// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clock from './components/clock/Clock';
import Timer from './components/timer/Timer';
import Stopwatch from './components/stopwatch/StopWatch';
import Header from './components/header/Header';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Clock />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </Router>
  );
}

export default App;
