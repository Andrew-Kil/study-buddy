import React, { Component } from "react";
import { Tasks } from "./Tasks.jsx";
import "./Tasks.scss";

export default class TasksContainer extends Component {
  state = {
    task: "",
    tasks: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.updateTasks(this.state.task);
    this.setState({ task: "" });
  };

  updateTask = e => this.setState({ task: e.target.value });

  updateTasks = task => this.setState({ tasks: [...this.state.tasks, task] });

  deleteTask = item => e => {
    const filteredTasks = this.state.tasks.filter(task => task !== item);
    this.setState({ tasks: filteredTasks });
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Add task"
            className="input-add-task"
            value={this.state.task}
            onChange={e => this.updateTask(e)}></input>
        </form>
        <Tasks tasks={this.state.tasks} deleteTask={this.deleteTask}></Tasks>
      </div>
    );
  }
}
