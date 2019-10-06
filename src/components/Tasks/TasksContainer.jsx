import React, { Component } from "react";
import { Tasks } from "./Tasks.jsx";
import "./Tasks.scss";

export default class TasksContainer extends Component {
  state = {
    task: "",
    tasks: []
  };

  componentDidMount() {
    this.setState({
      tasks: JSON.parse(localStorage.getItem("myTasks")) || []
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.updateTasks(this.state.task);
    this.setState({ task: "" });
  };

  updateTask = e => {
    this.setState({ task: e.target.value });
  };

  updateTasks = async task => {
    await this.setState({ tasks: [...this.state.tasks, task] });
    localStorage.setItem("myTasks", JSON.stringify(this.state.tasks));
  };

  deleteTask = item => () => {
    const filteredTasks = this.state.tasks.filter(task => task !== item);
    this.setState({ tasks: filteredTasks });
    localStorage.setItem("myTasks", JSON.stringify(filteredTasks));
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
