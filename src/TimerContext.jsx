import React, { createContext, useState } from "react";
import "./app.css";

// Create the context
export const TimerContext = createContext();

// Create the provider component
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
