import React from "react";
import { UseState } from "./UseState.js";
import { ClassState } from "./ClassState.js";
import { UseReducer } from "./UseReducer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UseReducer
        name="Use Reducer"
      />
      <UseState
        name="Use State"
      />
      <ClassState
        name="Class State"
      />
    </div>
  );
}

export default App;
