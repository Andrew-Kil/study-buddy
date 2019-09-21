import React, { Component } from "react";

import { Tasks } from "./Tasks.jsx";

import "./Tasks.scss";

export default class TasksContainer extends Component {
  state = {
    task: "",
    tasks: []
  };

  handleChange = e => {
    this.setState({ task: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: ""
    });
  };

  deleteTask = item => {
    const filteredTasks = this.state.tasks.filter(task => task !== item);
    this.setState({ tasks: filteredTasks });
  };

  render() {
    return (
      <>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Add task"
            className="input-add-task"
            value={this.state.task}
            onChange={this.handleChange}></input>
        </form>
        <Tasks
          tasks={this.state.tasks}
          deleteTask={this.deleteTask.bind(this)}></Tasks>
      </>
    );
  }
}
