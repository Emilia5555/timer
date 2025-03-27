import React, { useState, useEffect, useContext } from "react";
import settings from "./assets/settings.png";
import Settings from "./Settings";
import replay from "./assets/replay.png";
import defaultBackground from "./assets/default_background.jpg";
import { TimerContext } from "./TimerContext";
import "./app.css";

export const TimerProvider = ({ children }) => {
  const [pomodoro, setPomodoro] = useState(1500);
  const [short, setShort] = useState(300);
  const [long, setLong] = useState(1800);

  return (
    <TimerContext.Provider
      value={{
        pomodoro,
        setPomodoro,
        short,
        setShort,
        long,
        setLong,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const App = () => {
  const { pomodoro, short, long, setPomodoro, setShort, setLong} =
    useContext(TimerContext);
  const [timer, setTimer] = useState(pomodoro);
  const [timeRemaining, setTimeRemaining] = useState(pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonState, setButtonState] = useState("start");
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground);
  const [textColor, setTextColor] = useState("white")

  useEffect(() => {
    if (backgroundImage) {
      document.documentElement.style.setProperty(
        "--background-image",
        `url(${backgroundImage})`
      );
    }
  }, [backgroundImage]);

  useEffect(() => {
    if (textColor) {
      document.documentElement.style.setProperty("--textColor", textColor);
    }
  }, [textColor]);



  useEffect(() => {
    if (timeRemaining === 0) {
      console.log("timer complete");
      setButtonState("reset");
    }

    if (!isRunning || timeRemaining <= 0) {
      return;
    }

    const timerID = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerID);
  }, [isRunning, timeRemaining]);

  const seconds = timeRemaining % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const handleClickStart = () => {
    if (buttonState === "reset") {
      setTimeRemaining(timer);
      setIsRunning(true);
      setButtonState("pause");
    }

    if (isRunning) {
      stopTimer();
      setButtonState("start");
    } else {
      startTimer();
      setButtonState("pause");
    }
  };
  const handleClickPomodoro = () => {
    stopTimer();
    setButtonState("start");
    setTimeRemaining(pomodoro);
    setTimer(pomodoro);
    console.log("current timer:", timer);
  };
  const handleClickShort = () => {
    stopTimer();
    setButtonState("start");
    setTimeRemaining(short);
    setTimer(short);
    console.log("current timer:", timer);
  };
  const handleClickLong = () => {
    stopTimer();
    setButtonState("start");
    setTimeRemaining(long);
    setTimer(long);
    console.log("current timer:", timer);
  };

  const handleClickSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleSaveSettings = (newPomodoro, newShort, newLong) => {

    //avoids setting timers to NaN
    if (!isNaN(newPomodoro)) {
      setPomodoro(newPomodoro);
    }
    
    if (!isNaN(newShort)) {
      setShort(newShort);
    }
    
    if (!isNaN(newLong)) {
      setLong(newLong);
    }

    
    if (isRunning) stopTimer();
    console.log(timer)

    
    if (timer === pomodoro) {
      setTimeRemaining(newPomodoro);
      setTimer(newPomodoro);
    } else if (timer === short) {
      setTimeRemaining(newShort);
      setTimer(newShort);
    } else if (timer === long) {
      setTimeRemaining(newLong);
      setTimer(newLong);
    }
    
    setShowSettings(false);
  };

  const handleClickReset = () => {
    setTimeRemaining(timer);
    stopTimer();
    setButtonState("start");
  };

  return (
    <>
      <div className="mainContent">
        <div className="buttonsContainer">
          <button
          // dynamically sets classname- if timer == pomodoro class is buttons.active else class is buttons
            className={`buttons ${timer === pomodoro ? "active" : ""}`}
            onClick={handleClickPomodoro}
          >
            pomodoro
          </button>
          <button
            className={`buttons ${timer === short ? "active" : ""}`}
            onClick={handleClickShort}
          >
            short break
          </button>
          <button
            className={`buttons ${timer === long ? "active" : ""}`}
            onClick={handleClickLong}
          >
            long break
          </button>
        </div>

        <div className="timer">
          <h1>
            {Math.floor(timeRemaining / 60)}:{formattedSeconds}
          </h1>
        </div>
        <div className="lowerBtns">
          <button className="startBtn" onClick={handleClickStart}>
            {buttonState}
          </button>
          <button className="resetBtn" onClick={handleClickReset}>
            <img src={replay} alt="" />
          </button>
        </div>
        <div>
          <button className="settingsBtn" onClick={handleClickSettings}>
            <img src={settings} alt="settings" />
          </button>
        </div>
      </div>
      {showSettings && (
        <Settings
          onSave={handleSaveSettings}
          onBackgroundChange={setBackgroundImage}
          setShowSettings={setShowSettings}
          setTextColor={setTextColor}
        />
      )}
    </>
  );
};

export default App;
