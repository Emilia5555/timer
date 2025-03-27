import React, { useState, useContext } from "react";
import { TimerContext } from "./TimerContext";
import "./app.css";

const Settings = ({
  onSave,
  onBackgroundChange,
  setShowSettings,
  setTextColor,
}) => {
  const minToSec = (minutes) => minutes * 60;

  // Get values from TimerContext
  const { pomodoro, short, long } = useContext(TimerContext);

  const [newPomodoro, setNewPomodoro] = useState(pomodoro);
  const [newShort, setNewShort] = useState(short);
  const [newLong, setNewLong] = useState(long);
  // const [backgroundImg, setBackgroundImg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPomodoro >= 0 && newShort>=0 && newLong >= 0) {
      onSave(newPomodoro, newShort, newLong);
    }
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onBackgroundChange(imageUrl); // Pass image URL to App
    }
    setShowSettings(false);
    // onSave();
  };

  const handleColor = (e) => {
    const color = e.target.value;
    console.log("color: ", color);
    setTextColor(color);
  };

  return (
    <>
      <div className="settingsContainer">
        <form onSubmit={handleSubmit}>
          <br />
          <h6>Set pomodoro</h6>
          <input
            type="number"
            value={newPomodoro / 60}
            onChange={(e) =>
              setNewPomodoro(minToSec(parseInt(e.target.value, 10)))
            }
            placeholder="25"
          />
          <br />
            <h6>Set short break</h6>
          <input
            type="number"
            value={newShort / 60}
            onChange={(e) =>
              setNewShort(minToSec(parseInt(e.target.value, 10)))
            }
            placeholder="5"
          />
          <br />
            <h6>Set long break</h6>
          <input
            type="number"
            value={newLong / 60}
            onChange={(e) => setNewLong(minToSec(parseInt(e.target.value, 10)))}
            placeholder="30"
          />
          <br />

        <h6>
          Set background image: </h6>
          <input className="photoInput" type="file" accept="image/*" onChange={handleImg} />
          
        
        <h6>
          Set text color:  </h6> 
          
          <input className="colorInput" type="color" onChange={handleColor} />
          
        
        <button className="saveBtn" type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default Settings;
