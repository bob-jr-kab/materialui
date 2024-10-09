import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { GlobalStyles } from "@mui/material";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles
      styles={{
        fontFamily: "Tinos,Montserrat,PT Sans",
        body: { margin: 0, padding: 0 },
        html: { margin: 0, padding: 0 },
        "#root": { height: "100%", width: "100%" },
      }}
    />
    <App />
  </React.StrictMode>
);
