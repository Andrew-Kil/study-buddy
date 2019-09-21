import React from "react";

import TimerContainer from "./components/Timer/TimerContainer";
import ToDoContainer from "./components/ToDo/ToDoContainer";

import "./App.scss";

function App() {
  return (
    <>
      <h1>Pomodoro Timer</h1>
      <TimerContainer></TimerContainer>
      <ToDoContainer></ToDoContainer>
    </>
  );
}

export default App;
