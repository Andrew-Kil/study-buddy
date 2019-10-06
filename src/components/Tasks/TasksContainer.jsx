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
    this.setState({ [e.target.name]: e.target.value });
  };

  updateTasks = async task => {
    await this.setState({
      tasks: [...this.state.tasks, { text: task, completed: false }]
    });
    localStorage.setItem("myTasks", JSON.stringify(this.state.tasks));
  };

  deleteTask = item => () => {
    const filteredTasks = this.state.tasks.filter(task => task !== item);
    this.setState({ tasks: filteredTasks });
    localStorage.setItem("myTasks", JSON.stringify(filteredTasks));
  };

  completeTask = task => async () => {
    await this.setState({
      tasks: this.state.tasks.map(_task => {
        if (task === _task) {
          return {
            text: task.text,
            completed: !task.completed
          };
        } else {
          return _task;
        }
      })
    });
    localStorage.setItem("myTasks", JSON.stringify(this.state.tasks));
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            name="task"
            type="text"
            className="input-add-task"
            value={this.state.task}
            onChange={e => this.updateTask(e)}></input>
          <button type="submit">Add Task</button>
        </form>
        <Tasks
          tasks={this.state.tasks}
          deleteTask={this.deleteTask}
          completeTask={this.completeTask}></Tasks>
      </div>
    );
  }
}
