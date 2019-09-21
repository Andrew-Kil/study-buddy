import React, { useState } from "react";

import { Tasks } from "./Tasks.jsx";

import "./Tasks.scss";

export const TasksContainer = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const updateTask = e => {
    setTask(e.target.value);
  };

  const updateTasks = task => {
    setTasks(tasks => [...tasks, task]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateTasks(task);
    setTask("");
  };

  const deleteTask = item => e => {
    const filteredTasks = tasks.filter(task => task !== item);
    setTasks(filteredTasks);
  };

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Add task"
          className="input-add-task"
          value={task}
          onChange={e => updateTask(e)}></input>
      </form>
      <Tasks tasks={tasks} deleteTask={deleteTask}></Tasks>
    </>
  );
};
