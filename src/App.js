import React, { useState, useEffect } from "react";
import "./App.css";

var workTime = 25 * 60;
var breakTimeShort = 5 * 60;
var breakTimeLong = 15 * 60;

const Timer = () => {
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
  const [breakCounter, setBreakCounter] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showPause, setShowPause] = useState(false);

  useEffect(() => {
    !pause && countDown();
  });

  // main operating function
  const countDown = () => {
    seconds > 0
      ? setTimeout(() => setSeconds(seconds - 1), 1000)
      : (() => {
          setShowPause(false);
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
    //setShowPause(true);
  };
  const startWork = () => {
    document.body.style = "background: #FF5738;";
    setOnBreak(false);
    setSeconds(workTime);
    //setShowPause(true);
  };

  const setBreakTime = () => {
    return breakCounter < 3 ? breakTimeShort : breakTimeLong;
  };

  // skips timer seconds to 3
  const skipButton = () => {
    return (
      <button
        className="test-button"
        onClick={() => {
          setPause(true);
          setShowPause(false);
          setTimeout(() => {
            setSeconds(3);
            setClicked(true);
            setPause(false);
          }, 1000);
        }}
      >
        skip
      </button>
    );
  };
  const pauseButton = () => {
    return (
      <button
        className="pause-button"
        onClick={() => {
          setPause(!pause);
        }}
      >
        {pause ? (!onBreak ? "work" : "break") : "pause"}
      </button>
    );
  };
  const working = () => {
    return (
      <>
        <h2>
          {pause ? "Paused" : "Working"} {displayTime(seconds)}
        </h2>
        {!clicked && (
          <button
            onClick={() => {
              setPause(false);
              setClicked(true);
              setShowPause(true);
            }}
          >
            Start Work
          </button>
        )}
        {/* todo move pause btn here */}
      </>
    );
  };
  const takingBreak = () => {
    return (
      <>
        <div className="break-counter">break number {breakCounter}</div>
        <h2>
          {pause
            ? "Paused "
            : breakCounter <= 3
            ? "Short Break "
            : "Long Break "}
          {displayTime(seconds)}
        </h2>
        {!clicked && (
          <button
            onClick={() => {
              setPause(false);
              setClicked(true);
              setShowPause(true);
            }}
          >
            Start break
          </button>
        )}
      </>
    );
  };
  const menuClick = () => {
    //setShowMenu(!showMenu);
    var el = document.querySelector(".hamburger-clicked");
    if (!el) {
      el = document
        .querySelector(".hamburger")
        .classList.add("hamburger-clicked");
      document.querySelector(".menu-items").classList.add("show");
    } else {
      el.classList.remove("hamburger-clicked");
      document.querySelector(".menu-items").classList.remove("show");
    }
  };
  const adjustTime = (operator, timeType) => {
    var adjustedTime;
    if (timeType === "workTime") {
      operator === "+"
        ? (workTime = workTime + 60)
        : (workTime = workTime - 60);
      adjustedTime = workTime;
    } else if (timeType === "breakTimeShort") {
      operator === "+"
        ? (breakTimeShort = breakTimeShort + 60)
        : (breakTimeShort = breakTimeShort - 60);
      adjustedTime = breakTimeShort;
    } else if (timeType === "breakTimeLong") {
      operator === "+"
        ? (breakTimeLong = breakTimeLong + 60)
        : (breakTimeLong = breakTimeLong - 60);
      adjustedTime = breakTimeLong;
    }

    !onBreak && setSeconds(adjustedTime); // this is not working as intended
    onBreak && setSeconds(adjustedTime);
  };
  const adjustTimeButton = (operator, timeType) => {
    var style = {
      display: "inline-block",
      cursor: "pointer",
      float: "right",
      marginRight: "5px",
    };
    /* if (operator === "-") {
      style["marginRight"] = "5px";
    } else {
      style["marginRight"] = "5px";
    } */
    return (
      <div
        style={style}
        onClick={() => {
          adjustTime(operator, timeType);
        }}
      >
        {operator}
      </div>
    );
  };

  const menu = () => {
    return (
      <div className="menu">
        <div className="hamburger" onClick={menuClick}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        <div className="menu-items">
          <div>
            {adjustTimeButton("+", "workTime")}
            {adjustTimeButton("-", "workTime")}
            worktime{" "}
            <div
              style={{
                display: "inline-block",
                marginRight: "5px",
                float: "right",
              }}
            >
              {workTime / 60}
            </div>
            {/* dynamic time ?? worktime {parseInt(seconds / 60)
                OR plus 1 min
              */}
          </div>
          <div>
            {adjustTimeButton("+", "breakTimeShort")}
            {adjustTimeButton("-", "breakTimeShort")}short break{" "}
            <div
              style={{
                display: "inline-block",
                marginRight: "5px",
                float: "right",
              }}
            >
              {breakTimeShort / 60}
            </div>
          </div>
          <div>
            {adjustTimeButton("+", "breakTimeLong")}
            {adjustTimeButton("-", "breakTimeLong")}long break{" "}
            <div
              style={{
                display: "inline-block",
                marginRight: "5px",
                float: "right",
              }}
            >
              {breakTimeLong / 60}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {pause && menu()}
      <div className="timer">
        {skipButton()}
        {showPause && pauseButton()}
        {onBreak ? takingBreak() : working()}
      </div>
    </>
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
