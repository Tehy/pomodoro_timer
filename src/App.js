import React, { useState, useEffect } from "react";
import "./App.css";
const Timer = ({ time }) => {
  const [seconds, setSeconds] = useState(time);
  const [pause, setPause] = useState(true);

  /* const timer=()=>{
    const start = () => {
      console.log("timeout", seconds);
      return setTimeout(() => setSeconds(seconds + 1), 1000);
    };
    const reset = () => {
      clearTimeout(start)
      setSeconds
      return setTimeout(() => setSeconds(seconds + 1), 1000);
    };
  } */
  const timeout = () => {
    console.log("timeout", seconds);
    return setTimeout(() => setSeconds(seconds + 1), 1000);
  };

  useEffect(() => {
    !pause && timeout();
  });

  return (
    <>
      <div className="timer">
        <button
          onClick={() => {
            setPause(!pause);
          }}
        >
          {!pause ? "Pause" : "Start"}
        </button>
        {seconds}
        <button
          onClick={() => {
            clearTimeout(timeout);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">Pomodoro timer</header>
      <Timer time={0} />
    </div>
  );
}

export default App;
