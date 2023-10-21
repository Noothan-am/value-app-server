import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserIdContext } from "./context/UserIdContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <UserIdContext>
        <App />
      </UserIdContext>
    </Router>
  </React.StrictMode>
);
