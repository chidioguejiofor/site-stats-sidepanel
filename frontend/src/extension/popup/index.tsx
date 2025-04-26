import React from "react";
import ReactDOM from "react-dom/client";
import { PopupApp } from "./popup-app";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("popup-root")!).render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);
