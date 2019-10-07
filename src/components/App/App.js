import React from "react";
import TimerContainer from "../Timer/TimerContainer";
import TasksContainer from "../Tasks/TasksContainer";
import "./App.scss";

const App = () => {
  return (
    <div className="root-div">
      <TimerContainer></TimerContainer>
      <TasksContainer></TasksContainer>
    </div>
  );
};

export default App;
