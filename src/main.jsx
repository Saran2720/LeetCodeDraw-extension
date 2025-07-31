// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./index.css";

const rootEl = document.getElementById("flating-btn-wrapper");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>    
//     <App />
//   </React.StrictMode>
// );
