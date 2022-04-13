import React from "react";
import ReactDOM from "react-dom";
import "./style/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@iconscout/unicons/css/line.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
