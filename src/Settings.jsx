import React, { useState, useContext } from "react";
import { TimerContext } from "./TimerContext";

const Settings = ({ onSave }) => { // Accept onSave as a prop
  const minToSec = (minutes) => minutes * 60;

  // Get values from TimerContext
  const { pomodoro, short, long } = useContext(TimerContext);
  
  const [newPomodoro, setNewPomodoro] = useState(pomodoro);
  const [newShort, setNewShort] = useState(short);
  const [newLong, setNewLong] = useState(long);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newPomodoro, newShort, newLong); // Save values immediately
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <label>Set Pomodoro </label>
      <input
        type="number"
        value={newPomodoro / 60}
        onChange={(e) => setNewPomodoro(minToSec(parseInt(e.target.value, 10)))}
        placeholder="25"
      />
      <br />

      <label>Set Short Break </label>
      <input
        type="number"
        value={newShort / 60}
        onChange={(e) => setNewShort(minToSec(parseInt(e.target.value, 10)))}
        placeholder="5"
      />
      <br />

      <label>Set Long Break </label>
      <input
        type="number"
        value={newLong / 60}
        onChange={(e) => setNewLong(minToSec(parseInt(e.target.value, 10)))}
        placeholder="30"
      />
      <br />

      <button type="submit">Save</button>
    </form>
  );
};

export default Settings;
