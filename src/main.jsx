// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";




const targetRoot = document.getElementById("canvas-root") || document.getElementById("root");
if (targetRoot) {
  ReactDOM.createRoot(targetRoot).render(<App />);
}
