import React, { Component } from "react";

import { ToDo } from "./ToDo.jsx";

import "./ToDo.scss";

export default class ToDoContainer extends Component {
  state = {
    todo: "",
    todos: []
  };

  handleChange = e => {
    this.setState({ todo: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      todos: this.state.todos.concat(this.state.todo),
      todo: ""
    });
  };

  deleteToDo = task => {
    const filteredTodos = this.state.todos.filter(todo => task !== todo);
    this.setState({ todos: filteredTodos });
  };

  render() {
    return (
      <>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Add ToDo"
            className="input-add-todo"
            value={this.state.todo}
            onChange={this.handleChange}></input>
        </form>
        <ToDo
          todos={this.state.todos}
          deleteToDo={this.deleteToDo.bind(this)}></ToDo>
      </>
    );
  }
}
