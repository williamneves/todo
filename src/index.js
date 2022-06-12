import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "flowbite";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppWrapper } from "./lib/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AppWrapper>
  </React.StrictMode>
);
