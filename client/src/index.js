import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/_base.css";
import "./styles/_colors.css";
import "./styles/_fonts.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
