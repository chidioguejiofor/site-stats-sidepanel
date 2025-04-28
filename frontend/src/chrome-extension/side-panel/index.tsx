import React from "react";
import ReactDOM from "react-dom/client";
import { SidePanelApp } from "./side-panel-app";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("chrome-extension-root")!).render(
  <React.StrictMode>
    <SidePanelApp />
  </React.StrictMode>
);
