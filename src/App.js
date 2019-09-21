import React from "react";

import TimerContainer from "./components/Timer/TimerContainer";
import TasksContainer from "./components/Tasks/TasksContainer";

import "./App.scss";

function App() {
  return (
    <div className="root-div">
      <h1>Study Buddy</h1>
      <TimerContainer></TimerContainer>
      <TasksContainer></TasksContainer>
    </div>
  );
}

export default App;
