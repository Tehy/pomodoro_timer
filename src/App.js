import React, { useState, useEffect } from "react";
import "./App.css";

const Timer = () => {
  const workTime = 25 * 60;
  const breakTimeShort = 5 * 60;
  const breakTimeLong = 15 * 60;

  // parse time
  const displayTime = (t) => {
    const min = parseInt(t / 60).toString();
    const sec = (t % 60).toString();
    const time =
      (min.length === 1 ? "0" + min : min) +
      ":" +
      (sec.length === 1 ? "0" + sec : sec);
    return time;
  };

  const [seconds, setSeconds] = useState(workTime);
  const [pause, setPause] = useState(true);
  const [breakCounter, setBreakCounter] = useState(3);
  const [onBreak, setOnBreak] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    !pause && countDown();
  });

  // main operating function
  const countDown = () => {
    seconds > 0
      ? setTimeout(() => setSeconds(seconds - 1), 1000)
      : (() => {
          setClicked(false);
          setPause(true);
          breakCounter > 3 && setBreakCounter(0);
          return onBreak ? startWork() : startBreak();
        })();
  };
  const startBreak = () => {
    setBreakCounter(breakCounter + 1);
    breakCounter < 3
      ? (document.body.style = "background: #4598b4;")
      : (document.body.style = "background: #7fc023;");
    setOnBreak(true);
    setSeconds(setBreakTime());
  };
  const startWork = () => {
    document.body.style = "background: #FF5738;";
    setOnBreak(false);
    setSeconds(workTime);
  };

  const setBreakTime = () => {
    return breakCounter < 3 ? breakTimeShort : breakTimeLong;
  };

  // skips timer seconds to 5
  const testButton = () => {
    return (
      !clicked && (
        <button
          className="test-button"
          onClick={() => {
            setSeconds(3);
            setClicked(true);
            setPause(false);
          }}
        >
          skip
        </button>
      )
    );
  };
  const working = () => {
    return (
      <>
        <h2>Working {displayTime(seconds)}</h2>
        {!clicked && (
          <button
            onClick={() => {
              setPause(false);
              setClicked(true);
            }}
          >
            Start Work
          </button>
        )}
      </>
    );
  };
  const takingBreak = () => {
    return (
      <>
        <div className="break-counter">break number {breakCounter}</div>
        <h2>
          {breakCounter <= 3 ? "Short" : "Long"} Break {displayTime(seconds)}
        </h2>
        {!clicked && (
          <button
            onClick={() => {
              setPause(false);
              setClicked(true);
            }}
          >
            Start break
          </button>
        )}
      </>
    );
  };

  return (
    <div className="timer">
      {testButton()}
      {onBreak ? takingBreak() : working()}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">Pomodoro timer</header>
      <p className="description">time your work for efficiency</p>
      <Timer />
    </div>
  );
}

export default App;
