import React from "react";
import ReactDOM from "react-dom/client"; // For React 18+
import App from "./App";
import { TimerProvider } from "./TimerContext";
import "./app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </React.StrictMode>
);
