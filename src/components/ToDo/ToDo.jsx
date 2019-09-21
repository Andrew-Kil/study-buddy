import React from "react";

export const ToDo = props => {
  return (
    <div>
      <h2>To-Do(s)</h2>
      <ul>
        {props.todos.map((todo, idx) => {
          return (
            <div key={idx}>
              <li>{todo}</li>
              <button onClick={props.deleteToDo.bind(this, todo)}>
                delete
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
