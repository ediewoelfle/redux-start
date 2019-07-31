import React from "react";
import "./App.css";
import { Login } from "./screens/Login";
import { Devices } from "./screens/Devices";

const url = "http://localhost:3000/devices";

const App = () => {
  return (
    <div className="App">
      <Login url={url} />
      <Devices />
    </div>
  );
};

export default App;
