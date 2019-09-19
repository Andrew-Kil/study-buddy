import React, { Component } from "react";

import { ToDo } from "./ToDo.jsx";

import "./ToDo.css";

export default class ToDoContainer extends Component {
  state = {
    todos: ["stuff", "okay"]
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Add ToDo"
          className="input-add-todo"></input>
        <ToDo todos={this.state.todos}></ToDo>
      </div>
    );
  }
}
